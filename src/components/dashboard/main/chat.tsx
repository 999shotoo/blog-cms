'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

type Message = {
    id: number
    text: string
    sender: 'user' | 'ai'
}

export default function ChatMainDashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    const handleSend = () => {
        if (input.trim()) {
            const newMessage: Message = { id: Date.now(), text: input, sender: 'user' }
            setMessages(prev => [...prev, newMessage])
            setInput('')

            // Simulate AI response
            setTimeout(() => {
                const aiMessage: Message = { id: Date.now(), text: "This is a simulated AI response.", sender: 'ai' }
                setMessages(prev => [...prev, aiMessage])
            }, 1000)
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    return (
        <div className="flex flex-col h-[90vh] md:h-screen">
            <header className="p-4 border-b">
                <h1 className="text-xl font-bold">AI Chat</h1>
            </header>
            <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'
                            }`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg ${message.sender === 'user'
                                    ? 'bg-border text-gray-300'
                                    : 'bg-primary-foreground text-gray-300'
                                }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </ScrollArea>
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
    )
}