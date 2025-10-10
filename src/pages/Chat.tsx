import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Paperclip, Mic, Send } from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState("Chat");

  const contacts = [
    { name: "Person 1", message: "Axaaxax", time: "5 min ago" },
    { name: "Person 2", message: "пон", time: "30 min ago" },
    { name: "Person 3", message: "дану", time: "45 min ago" },
    { name: "Person 4", message: "О да! давай окунимся в ...", time: "45 min ago" },
    { name: "Chat", message: "Шлюшка: Caco", time: "2 hour ago" },
    { name: "Байсал агай", message: "Ғылым жоба қалай?", time: "5 hour ago" },
    { name: "Тайр ага", message: "yaранейкум у тебя 4", time: "1 day ago" },
  ];

  const messages = [
    { sender: "Человек 1", text: "", type: "other" },
    { sender: "Person 2", text: "", type: "other" },
    { sender: "Человек 1", text: "", type: "other" },
    { sender: "You", text: "", type: "self" },
  ];

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar - Contacts */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <Button variant="ghost" className="w-full justify-start gap-2">
            Open
            <ChevronDown className="h-4 w-4 ml-auto" />
          </Button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {contacts.map((contact, i) => (
            <div
              key={i}
              onClick={() => setSelectedChat(contact.name)}
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
              {selectedChat.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedChat}</h2>
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
                  <p className="text-sm">{message.text || "Message content"}</p>
                </div>
              </div>
              {message.type === "self" && (
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/20">You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <div className="bg-muted rounded-2xl px-4 py-2 max-w-md">
              <span className="text-xs text-muted-foreground">Ты</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <Input
              placeholder="Write your message"
              className="flex-1 rounded-full bg-muted border-0"
            />
            <Button variant="ghost" size="icon">
              <Mic className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
