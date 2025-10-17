import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Paperclip, Mic, Send, Search, Moon, BellOff, Settings, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversationId) {
      loadMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  const loadConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else if (data) {
      setContacts(data.map(conv => ({
        id: conv.id,
        name: conv.contact_name,
        message: "Последнее сообщение",
        time: new Date(conv.created_at).toLocaleString('ru-RU')
      })));
    }
  };

  const loadMessages = async (conversationId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error(error);
    } else if (data) {
      setMessages(data.map(msg => ({
        sender: msg.sender,
        text: msg.content,
        type: msg.sender === "You" ? "self" : "other"
      })));
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedConversationId) {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversationId,
          sender: "You",
          content: messageInput
        });

      if (error) {
        toast.error("Ошибка отправки сообщения");
        console.error(error);
      } else {
        loadMessages(selectedConversationId);
        setMessageInput("");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Contacts */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2"
            onClick={() => setSearchOpen(true)}
          >
            Open
            <ChevronDown className="h-4 w-4 ml-auto" />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {contacts.map((contact, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedChat(contact.name);
                setSelectedConversationId(contact.id);
              }}
              className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer transition-colors ${
                selectedChat === contact.name ? "bg-muted" : ""
              }`}
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-muted-foreground/20">
                  {contact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm truncate">{contact.name}</p>
                  <span className="text-xs text-muted-foreground">{contact.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{contact.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 border-b px-6 flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-muted-foreground/20">
              {selectedChat?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedChat || "Выберите чат"}</h2>
            <p className="text-xs text-muted-foreground">4 members, 2 online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="text-center">
            <span className="text-xs text-muted-foreground">Today</span>
          </div>

          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex gap-3 ${
                message.type === "self" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "other" && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-muted-foreground/20">
                    {message.sender.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={`space-y-1 ${message.type === "self" ? "items-end" : "items-start"} flex flex-col`}>
                {message.type === "other" && (
                  <span className="text-xs text-muted-foreground">{message.sender}</span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 max-w-md ${
                    message.type === "self"
                      ? "bg-primary/10 ml-auto"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
              {message.type === "self" && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/20">You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Input
              placeholder="Write your message"
              className="flex-1 rounded-full bg-muted border-0"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="flex h-full">
            {/* Contact List Sidebar */}
            <div className="w-80 border-r flex flex-col">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    onClick={() => setSearchOpen(false)}
                    className="font-semibold"
                  >
                    Open <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                {contacts.map((contact, index) => (
                  <div
                   key={index}
                    onClick={() => {
                      setSelectedChat(contact.name);
                      setSelectedConversationId(contact.id);
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                  >
                    <Avatar>
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Panel */}
            <div className="flex-1 flex flex-col p-6">
              <div className="max-w-2xl w-full mx-auto space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search"
                      className="pl-10 h-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-4">Actions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer">
                        <Moon className="h-5 w-5 text-muted-foreground" />
                        <span>Do not disturb</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer">
                        <BellOff className="h-5 w-5 text-muted-foreground" />
                        <span>Pause Notification</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                        <span>Settings</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-4">Suggestions</h3>
                    <div className="space-y-2">
                      {["Person 1", "Person 2", "Person 3"].map((person, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
                        >
                          <Avatar>
                            <AvatarFallback>{person[0]}</AvatarFallback>
                          </Avatar>
                          <span>{person}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-4">Others</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
