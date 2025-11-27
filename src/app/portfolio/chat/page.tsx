"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Send, Bot, Loader2, Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeft, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Session {
  id: string;
  title: string;
}

const QUICK_ASKS = [
  "Portfolio overview",
  "Top formulations by revenue",
  "Yearly projections",
  "Most used ingredients",
];

export default function ChatPage() {
  const supabase = createClient();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auth - use getSession() to avoid redundant network calls
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUserId(session?.user?.id || null));
  }, [supabase.auth]);

  // Load sessions
  useEffect(() => {
    if (!userId) return;
    supabase.from("chat_sessions").select("id, title").eq("user_id", userId).order("updated_at", { ascending: false })
      .then(({ data }) => setSessions(data || []));
  }, [userId, supabase]);

  // Load messages
  useEffect(() => {
    if (!sessionId) return setMessages([]);
    supabase.from("chat_messages").select("id, role, content").eq("session_id", sessionId).order("created_at")
      .then(({ data }) => setMessages((data as Message[]) || []));
  }, [sessionId, supabase]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const newChat = () => {
    setSessionId(null);
    setMessages([]);
  };

  const deleteChat = async (id: string) => {
    await supabase.from("chat_sessions").delete().eq("id", id);
    setSessions((s) => s.filter((x) => x.id !== id));
    if (id === sessionId) newChat();
  };

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading || !userId) return;
    
    let sid = sessionId;
    if (!sid) {
      const { data } = await supabase.from("chat_sessions").insert({ user_id: userId, title: text.slice(0, 40) }).select().single();
      if (data) {
        setSessions((s) => [data, ...s]);
        setSessionId(data.id);
        sid = data.id;
      }
    }

    const { data: userMsg } = await supabase.from("chat_messages").insert({ session_id: sid, role: "user", content: text.trim() }).select().single();
    if (!userMsg) return;

    setMessages((m) => [...m, userMsg as Message]);
    setInput("");
    setLoading(true);

    const tempId = crypto.randomUUID();
    setMessages((m) => [...m, { id: tempId, role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })), model: "claude-haiku" }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value);
        setMessages((m) => m.map((x) => (x.id === tempId ? { ...x, content: full } : x)));
      }

      const { data: saved } = await supabase.from("chat_messages").insert({ session_id: sid, role: "assistant", content: full }).select().single();
      if (saved) setMessages((m) => m.map((x) => (x.id === tempId ? (saved as Message) : x)));
    } catch {
      setMessages((m) => m.filter((x) => x.id !== tempId));
    } finally {
      setLoading(false);
    }
  }, [sessionId, messages, loading, userId, supabase]);

  if (!userId) {
    return <div className="h-full flex items-center justify-center text-muted-foreground">Please sign in to continue</div>;
  }

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className={cn(
        "h-full bg-muted/50 border-r flex flex-col transition-all duration-200 overflow-hidden",
        sidebarOpen ? "w-72" : "w-0"
      )}>
        {/* Sidebar Header - matches main header height */}
        <div className="h-14 px-4 border-b flex items-center shrink-0">
          <Button variant="outline" className="w-full gap-2 justify-start h-9" onClick={newChat}>
            <Plus className="h-4 w-4" />
            New conversation
          </Button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2">
          {sessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No conversations yet</p>
          ) : (
            <div className="space-y-1">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSessionId(s.id)}
                  className={cn(
                    "group flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors",
                    s.id === sessionId 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate text-sm">{s.title}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteChat(s.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-opacity"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Data Source Info */}
        <div className="p-3 border-t bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Database className="h-3.5 w-3.5" />
            <span>Connected to Supabase</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 border-b flex items-center gap-3 px-4 shrink-0">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
          </Button>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Dr Bob</h1>
            <p className="text-xs text-muted-foreground">Portfolio AI Assistant</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Bot className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">How can I help?</h2>
              <p className="text-muted-foreground text-center max-w-md mb-8">
                I can analyze your portfolio data from Supabase - formulations, business cases, ingredients, and financials.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_ASKS.map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="px-4 py-2 rounded-full border hover:bg-muted transition-colors text-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-6 px-4">
              {messages.map((m) => (
                <div key={m.id} className={cn("mb-6", m.role === "user" && "flex justify-end")}>
                  {m.role === "assistant" ? (
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1 prose prose-sm dark:prose-invert max-w-none">
                        <RenderMarkdown content={m.content} />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3 max-w-[80%]">
                      {m.content}
                    </div>
                  )}
                </div>
              ))}

              {loading && messages[messages.length - 1]?.content === "" && (
                <div className="flex gap-4 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary-foreground animate-spin" />
                  </div>
                  <div className="text-muted-foreground text-sm">Analyzing portfolio data...</div>
                </div>
              )}

              <div ref={scrollRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4 shrink-0">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-muted/50 rounded-2xl border p-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Ask about your portfolio..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-3 py-2 text-sm focus:outline-none placeholder:text-muted-foreground min-h-[40px] max-h-[150px]"
                disabled={loading}
              />
              <Button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                size="icon"
                className="h-9 w-9 rounded-xl shrink-0"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Data sourced from: vw_dashboard_summary, vw_formulations_with_ingredients, vw_ingredient_usage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderMarkdown({ content }: { content: string }) {
  if (!content) return null;

  return (
    <div className="space-y-3">
      {content.split("\n").map((line, i) => {
        // Headers
        if (line.startsWith("### ")) return <h4 key={i} className="font-semibold text-base mt-4 mb-2">{line.slice(4)}</h4>;
        if (line.startsWith("## ")) return <h3 key={i} className="font-semibold text-lg mt-5 mb-2">{line.slice(3)}</h3>;
        if (line.startsWith("# ")) return <h2 key={i} className="font-bold text-xl mt-5 mb-3">{line.slice(2)}</h2>;

        // Bold replacement
        const withBold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-muted-foreground">•</span>
              <span dangerouslySetInnerHTML={{ __html: withBold.slice(2) }} />
            </div>
          );
        }

        // Numbered lists
        const numMatch = line.match(/^(\d+)\.\s(.+)/);
        if (numMatch) {
          return (
            <div key={i} className="flex gap-2 pl-1">
              <span className="text-muted-foreground w-5">{numMatch[1]}.</span>
              <span dangerouslySetInnerHTML={{ __html: numMatch[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          );
        }

        // Table rows
        if (line.startsWith("|")) {
          return <code key={i} className="block text-xs font-mono bg-muted/50 px-2 py-1 rounded">{line}</code>;
        }

        // Horizontal rule
        if (line === "---" || line === "===") return <hr key={i} className="my-4 border-border" />;

        // Empty line
        if (!line.trim()) return <div key={i} className="h-2" />;

        // Regular paragraph
        return <p key={i} dangerouslySetInnerHTML={{ __html: withBold }} />;
      })}
    </div>
  );
}
