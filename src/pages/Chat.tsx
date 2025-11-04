import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip, Mic, Send, Search, Moon, BellOff, Settings, X, Plus, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [newContactName, setNewContactName] = useState("");

  useEffect(() => {
    loadConversations();
    createDefaultContacts();
  }, []);

  const createDefaultContacts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id || '00000000-0000-0000-0000-000000000000';

    // Check if default contacts already exist
    const { data: existing } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('user_id', userId);

    if (existing && existing.length > 0) return;

    // Create default contacts
    const defaultContacts = ['Person 1', 'Person 2', 'Person 3', 'Person 4'];
    
    for (const name of defaultContacts) {
      await supabase
        .from('chat_conversations')
        .insert({
          user_id: userId,
          contact_name: name
        });
    }

    loadConversations();
  };

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

  const handleCreateContact = async () => {
    if (!newContactName.trim()) {
      toast.error("Введите имя контакта");
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert({
        user_id: user?.id || '00000000-0000-0000-0000-000000000000',
        contact_name: newContactName
      })
      .select()
      .single();

    if (error) {
      toast.error("Ошибка создания контакта");
      console.error(error);
    } else {
      toast.success("Контакт создан!");
      setNewContactName("");
      setShowCreateContact(false);
      loadConversations();
      
      // Автоматически открываем новый чат
      if (data) {
        setSelectedChat(data.contact_name);
        setSelectedConversationId(data.id);
        setSearchOpen(false);
      }
    }
  };

  const handleSelectSuggestion = async (personName: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    // Проверяем, существует ли уже такой контакт
    const existingContact = contacts.find(c => c.name === personName);
    
    if (existingContact) {
      // Если контакт уже есть, просто открываем чат
      setSelectedChat(existingContact.name);
      setSelectedConversationId(existingContact.id);
      setSearchOpen(false);
    } else {
      // Если контакта нет, создаем новый
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user?.id || '00000000-0000-0000-0000-000000000000',
          contact_name: personName
        })
        .select()
        .single();

      if (error) {
        toast.error("Ошибка создания контакта");
        console.error(error);
      } else if (data) {
        toast.success(`Чат с ${personName} создан!`);
        loadConversations();
        setSelectedChat(data.contact_name);
        setSelectedConversationId(data.id);
        setSearchOpen(false);
      }
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Chats</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {contacts.length === 0 ? (
            <div className="p-4 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Нет чатов</p>
              <Button 
                variant="link" 
                onClick={() => setSearchOpen(true)}
                className="text-xs"
              >
                Создать контакт
              </Button>
            </div>
          ) : (
            contacts.map((contact, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedChat(contact.name);
                setSelectedConversationId(contact.id);
                setSearchOpen(false);
              }}
              className={`flex items-center gap-3 p-4 hover:bg-muted cursor-pointer transition-colors ${
                selectedConversationId === contact.id ? "bg-muted" : ""
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
          ))
          )}
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
          {!selectedConversationId ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Выберите чат для начала общения</p>
                <Button onClick={() => setSearchOpen(true)} variant="outline">
                  Открыть список контактов
                </Button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Input Area */}
        {selectedConversationId && (
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
        )}
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
          <div className="flex h-full">
            {/* Contact List Sidebar */}
            <div className="w-80 border-r flex flex-col">
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Контакты</h2>
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
                          onClick={() => handleSelectSuggestion(person)}
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
                    <Button 
                      onClick={() => {
                        setShowCreateContact(true);
                        setSearchOpen(false);
                      }}
                      className="w-full"
                      variant="outline"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Создать новый контакт
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Contact Dialog */}
      <Dialog open={showCreateContact} onOpenChange={setShowCreateContact}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать новый контакт</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Имя контакта</Label>
              <Input
                id="contact-name"
                placeholder="Введите имя"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateContact();
                  }
                }}
              />
            </div>
            <Button onClick={handleCreateContact} className="w-full">
              Создать
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
