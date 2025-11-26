"use client";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Send,
  Sparkles,
  User,
  Bot,
  Loader2,
  FlaskConical,
  TrendingUp,
  Globe,
  Pill,
  BarChart3,
  Square,
} from "lucide-react";

const SUGGESTED_QUESTIONS = [
  {
    icon: BarChart3,
    text: "Give me a dashboard summary of the portfolio",
    category: "Overview",
  },
  {
    icon: TrendingUp,
    text: "What are the top 10 business cases by revenue?",
    category: "Business",
  },
  {
    icon: FlaskConical,
    text: "How many formulations are in each status?",
    category: "Formulations",
  },
  {
    icon: Globe,
    text: "Show me business case performance by country",
    category: "Markets",
  },
  {
    icon: Pill,
    text: "Which ingredients are used most across formulations?",
    category: "Ingredients",
  },
  {
    icon: Sparkles,
    text: "Compare our herbicide vs fungicide portfolios",
    category: "Analysis",
  },
];

export default function ChatPage() {
  const { messages, sendMessage, stop, status } = useChat({
    api: "/api/chat",
  });

  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Check both React state and DOM value (for browser automation compatibility)
    const domValue = inputRef.current?.value || "";
    const messageText = inputValue.trim() || domValue.trim();
    
    if (!messageText || isLoading) return;

    setInputValue("");
    if (inputRef.current) inputRef.current.value = "";
    await sendMessage({ content: messageText });
  };

  // Handle keyboard submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle suggested question click
  const handleSuggestionClick = async (question: string) => {
    if (isLoading) return;
    setInputValue("");
    await sendMessage({ content: question });
  };

  // Get text content from message
  const getMessageContent = (message: typeof messages[0]): string => {
    // Try parts first (newer API), fallback to content (older API)
    if (message.parts && message.parts.length > 0) {
      return message.parts
        .filter((part): part is { type: "text"; text: string } => part.type === "text")
        .map((part) => part.text)
        .join("");
    }
    // Fallback to content property
    if (typeof (message as { content?: string }).content === "string") {
      return (message as { content: string }).content;
    }
    return "";
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex-shrink-0 border-b bg-gradient-to-r from-background via-background to-muted/30">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
                <Sparkles className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Dr Bob</h1>
              <p className="text-sm text-muted-foreground">
                AI-powered insights into your product portfolio
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            // Empty state with suggestions
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
              <div className="text-center space-y-3">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/90 to-primary/60 text-primary-foreground shadow-xl mx-auto">
                    <Bot className="h-10 w-10" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mt-6">
                  How can I help you today?
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Ask me anything about your formulations, business cases, markets, or
                  ingredients. I can analyze trends, compare products, and generate
                  insights.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-4xl">
                {SUGGESTED_QUESTIONS.map((suggestion, index) => (
                  <Card
                    key={index}
                    interactive
                    className="p-4 group"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <suggestion.icon className="h-4 w-4" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">
                          {suggestion.category}
                        </p>
                        <p className="text-sm font-medium leading-snug">
                          {suggestion.text}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Message list
            <div className="space-y-6 max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                        <Bot className="h-4 w-4" />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted/50 border rounded-bl-md"
                    )}
                  >
                    <div
                      className={cn(
                        "prose prose-sm max-w-none",
                        message.role === "user"
                          ? "prose-invert"
                          : "prose-neutral dark:prose-invert"
                      )}
                    >
                      <MessageContent content={getMessageContent(message)} />
                    </div>
                  </div>

                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground shadow-md">
                        <User className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="bg-muted/50 border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Analyzing your data...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t bg-gradient-to-t from-muted/30 to-background">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="relative flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about your portfolio..."
                  rows={1}
                  className={cn(
                    "flex min-h-[44px] max-h-[200px] w-full resize-none rounded-xl border border-input bg-background px-4 py-3 pr-12 text-sm shadow-sm transition-all duration-200",
                    "placeholder:text-muted-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  style={{
                    height: "auto",
                    minHeight: "44px",
                  }}
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-2">
                {isLoading ? (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => stop()}
                    className="h-11 w-11 rounded-xl"
                  >
                    <Square className="h-4 w-4" />
                    <span className="sr-only">Stop generating</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading}
                    className="h-11 w-11 rounded-xl shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                )}
              </div>
            </div>

            <p className="mt-2 text-xs text-center text-muted-foreground">
              AI responses are generated from your portfolio data. Always verify important
              decisions.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// Component to render message content with proper formatting
function MessageContent({ content }: { content: string }) {
  // Simple markdown-like rendering for basic formatting
  const lines = content.split("\n");

  return (
    <div className="space-y-2">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={index} className="font-semibold text-base mt-3 mb-1">
              {line.slice(4)}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={index} className="font-semibold text-lg mt-4 mb-2">
              {line.slice(3)}
            </h3>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h2 key={index} className="font-bold text-xl mt-4 mb-2">
              {line.slice(2)}
            </h2>
          );
        }

        // Bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={index} className="flex gap-2 ml-2">
              <span className="text-muted-foreground">•</span>
              <span>{renderInlineFormatting(line.slice(2))}</span>
            </div>
          );
        }

        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s(.+)/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex gap-2 ml-2">
              <span className="text-muted-foreground font-medium min-w-[1.5rem]">
                {numberedMatch[1]}.
              </span>
              <span>{renderInlineFormatting(numberedMatch[2])}</span>
            </div>
          );
        }

        // Empty lines
        if (!line.trim()) {
          return <div key={index} className="h-2" />;
        }

        // Regular paragraph
        return <p key={index}>{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

// Render inline formatting (bold, italic, code)
function renderInlineFormatting(text: string): React.ReactNode {
  // Split by formatting markers while preserving them
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code: `code`
    const codeMatch = remaining.match(/`(.+?)`/);

    // Find the earliest match
    let earliestMatch: RegExpMatchArray | null = null;
    let matchType: "bold" | "code" | null = null;

    if (boldMatch && (!codeMatch || boldMatch.index! < codeMatch.index!)) {
      earliestMatch = boldMatch;
      matchType = "bold";
    } else if (codeMatch) {
      earliestMatch = codeMatch;
      matchType = "code";
    }

    if (!earliestMatch || earliestMatch.index === undefined) {
      // No more matches, add remaining text
      parts.push(remaining);
      break;
    }

    // Add text before the match
    if (earliestMatch.index > 0) {
      parts.push(remaining.slice(0, earliestMatch.index));
    }

    // Add the formatted content
    if (matchType === "bold") {
      parts.push(
        <strong key={key++} className="font-semibold">
          {earliestMatch[1]}
        </strong>
      );
    } else if (matchType === "code") {
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs"
        >
          {earliestMatch[1]}
        </code>
      );
    }

    // Continue with the rest of the string
    remaining = remaining.slice(earliestMatch.index + earliestMatch[0].length);
  }

  return parts.length > 0 ? parts : text;
}
