"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Bot, Minimize2, X, Send, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  code?: string;
}

export const exportMessageText = (text: string) => {
  console.log("User message:", text);
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  async function generateResponse(userMessage: string) {
    setIsTyping(true);
    const hfResponse = await query({ inputs: userMessage });
    setIsTyping(false);

    return {
      content: hfResponse?.[0]?.generated_text || "No response from API",
      code: "",
    };
  }

  const query = async (data: { inputs: string }) => {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    exportMessageText(userMessage.content);

    const response = await generateResponse(input);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: response.content,
      code: response.code,
      isBot: true,
    };

    setMessages((prev) => [...prev, botMessage]);
    if (!isOpen) {
      setHasNewMessage(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-[400px] h-[600px] bg-background border rounded-lg shadow-xl flex flex-col animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between bg-primary/10 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">
                  Technical Assistant
                </h3>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-primary/20 text-foreground flex items-center justify-center transition-colors duration-200 hover:rounded-full"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMessages([]);
                }}
                className="h-8 w-8 hover:bg-primary/20 text-foreground flex items-center justify-center transition-colors duration-200 hover:rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          {/* Messages */}
          <div className="flex-1 p-4 bg-secondary/30 overflow-y-auto">
            <div className="flex flex-col gap-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground text-sm p-4">
                  <p className="mb-2">
                    👋 Hello! I am your technical assistant.
                  </p>
                  <p>🤖 How may I assist you today?</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2",
                    message.isBot ? "justify-start" : "justify-end"
                  )}
                >
                  {message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2 shadow-sm whitespace-pre-wrap leading-relaxed prose prose-invert",
                      message.isBot
                        ? "bg-card text-card-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                    {message.code && (
                      <pre className="mt-2 p-3 bg-muted rounded-lg border text-sm overflow-x-auto font-mono">
                        <code>{message.code}</code>
                      </pre>
                    )}
                  </div>
                  {!message.isBot && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-card text-card-foreground max-w-[85%] rounded-2xl px-4 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-100">•</span>
                      <span className="animate-bounce delay-200">•</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Input */}
          <div className="p-4 border-t bg-background">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question here..."
                className="text-black bg-white flex-1 border border-secondary/30 p-2 rounded"
              />
              <button
                type="submit"
                className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-indigo-500/90 flex items-center justify-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          className="h-14 w-14 rounded-full shadow-lg relative bg-gradient-to-r from-indigo-500 to-indigo-700 hover:bg-indigo-500/90 animate-in fade-in duration-300 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
          {hasNewMessage && (
            <span className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-600 text-white">
              1
            </span>
          )}
        </button>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(ChatBot), { ssr: false });
