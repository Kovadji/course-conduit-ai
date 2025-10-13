import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Presentation, BookOpen, Code, MessageCircle, Plus, Trash2, Image as ImageIcon, ChevronDown, Folder, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AiTutor = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось получить ответ от AI",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: Presentation, label: "Presentation generation" },
    { icon: BookOpen, label: "Homework help" },
    { icon: Code, label: "Code generation" },
    { icon: MessageCircle, label: "Explain topics" },
  ];

  const handleQuickAction = (label: string) => {
    let prompt = '';
    switch (label) {
      case 'Presentation generation':
        prompt = 'Помоги мне создать презентацию';
        break;
      case 'Homework help':
        prompt = 'Помоги мне с домашним заданием';
        break;
      case 'Code generation':
        prompt = 'Помоги мне написать код';
        break;
      case 'Explain topics':
        prompt = 'Объясни мне тему';
        break;
    }
    sendMessage(prompt);
  };

  const folders = [
    { name: "UI/UX design", color: "bg-foreground" },
    { name: "Homework", color: "bg-destructive" },
    { name: "Presentations", color: "bg-primary" },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full space-y-8 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">How can I help you?</h1>
                <p className="text-lg text-muted-foreground">
                  Choose from the recommendations below or ask me anything
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, i) => (
                  <Card 
                    key={i} 
                    className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                    onClick={() => handleQuickAction(action.label)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <action.icon className="h-6 w-6 text-primary" />
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 max-w-4xl mx-auto w-full">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </Button>
            <Input 
              placeholder="Ask me anything..." 
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button 
              size="icon" 
              className="flex-shrink-0"
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l bg-card p-6 space-y-6">
        <h2 className="text-xl font-bold">AI-tutor</h2>
        
        <Tabs defaultValue="ai-tutor" className="w-full">
          <TabsList className="grid w-full grid-cols-1 mb-4">
            <TabsTrigger value="ai-tutor" className="bg-primary text-primary-foreground data-[state=inactive]:bg-transparent data-[state=inactive]:text-foreground">
              AI-tutor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai-tutor" className="space-y-3">
            <Button variant="secondary" className="w-full justify-start gap-3">
              <LayoutDashboard className="h-5 w-5" />
              Explore AI-tutor
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <Trash2 className="h-5 w-5" />
              Trash
            </Button>
            <Button variant="secondary" className="w-full justify-start gap-3">
              <ImageIcon className="h-5 w-5" />
              Gallery
            </Button>
          </TabsContent>
        </Tabs>

        <div className="space-y-3">
          <Button variant="ghost" className="w-full justify-start gap-2 font-semibold">
            <ChevronDown className="h-4 w-4" />
            Folders
          </Button>
          
          <div className="space-y-2 pl-2">
            {folders.map((folder, i) => (
              <div key={i} className="flex items-center gap-3 py-2 px-3 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <div className={`w-3 h-3 rounded-full ${folder.color}`}></div>
                <span className="text-sm">{folder.name}</span>
              </div>
            ))}
          </div>

          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
            <Plus className="h-4 w-4" />
            New folder
          </Button>
        </div>
      </div>
    </div>
  );
};

const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

export default AiTutor;
