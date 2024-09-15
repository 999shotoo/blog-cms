"use client";
import ReactMarkdown from 'react-markdown';
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  loading: boolean;
  avatar: JSX.Element; 
}

export default function ChatMainDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const [typing, setTyping] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: 'user',
        loading: false,
        avatar: <Avatar><AvatarImage src="/userpfp.jpg" /></Avatar>,
      };
      setMessages(prev => [...prev, newMessage]);

      try {
        const response = await fetch('/api/v1/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [newMessage] }),
        });

        const { text } = await response.json();
        const aiMessage: Message = {
          id: Date.now(),
          text,
          sender: 'ai',
          loading: true,
          avatar: <Avatar><AvatarImage src="/aipfp.jpg" /></Avatar>,
        };

        setMessages(prev => [...prev, aiMessage]);

        setTimeout(() => {
          aiMessage.loading = false;
          setMessages(prev => prev.map(m => m.id === aiMessage.id ? aiMessage : m));
        }, 2000);

        if (scrollRef.current) {
          (scrollRef.current as HTMLDivElement).scrollTop = (scrollRef.current as HTMLDivElement).scrollHeight;
        }
      } catch (error) {
        console.error(error);
      }

      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[90vh] md:h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Chat</h1>
      </header>
      <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            data-message-id={message.id}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex">
              {message.sender === 'ai' && (
                <div className="mr-2">{message.avatar}</div>
              )}
              <div
                className={`inline-block p-2 rounded-lg max-w-4xl ${message.sender === 'user' ? 'bg-primary-foreground text-white' : 'bg-primary-foreground text-white'}`}
              >
                {message.sender === 'ai' ? (
                  message.loading ? (
                    <span className="animate-pulse text-lg">
                      Loading...
                    </span>
                  ) : (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  )
                ) : (
                  message.text
                )}
              </div>
              {message.sender === 'user' && (
                <div className="ml-2">{message.avatar}</div> 
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSend} variant={`outline`}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}