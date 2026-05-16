"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type AssessmentResult = {
  strengths: { name: string; score: number; description: string }[];
  growthAreas: { name: string; description: string }[];
};

const TOTAL_QUESTIONS = 10;

export default function AssessmentPage() {
  const t = useTranslations("assessment");
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const progress = (userMessageCount / TOTAL_QUESTIONS) * 100;

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function startAssessment() {
    setStarted(true);
    setLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    const { data: assessment } = await supabase
      .from("assessments")
      .insert({ user_id: user.id, status: "in_progress" })
      .select("id")
      .single();

    if (assessment) setAssessmentId(assessment.id);

    const res = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    });
    const data = await res.json();
    setMessages([{ role: "assistant", content: data.content }]);
    setLoading(false);
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });
    const data = await res.json();

    setMessages([...newMessages, { role: "assistant", content: data.content }]);

    if (data.isComplete && data.result) {
      setResult(data.result);

      if (assessmentId) {
        const supabase = createClient();
        await supabase
          .from("assessments")
          .update({
            status: "completed",
            completed_at: new Date().toISOString(),
            result_json: data.result,
          })
          .eq("id", assessmentId);
      }
    }

    setLoading(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!started) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted-foreground mb-8">
            ตอบคำถาม 10 ข้อ เพื่อค้นพบจุดแข็งและจุดอ่อนของคุณ ใช้เวลาประมาณ 10-15 นาที
          </p>
          <Button size="lg" onClick={startAssessment}>
            {t("start")}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold">{t("complete")}</h1>
          </motion.div>

          <Card className="p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">🏆 จุดแข็ง Top 5</h2>
            <div className="space-y-4">
              {result.strengths.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm text-muted-foreground">{s.score}%</span>
                  </div>
                  <Progress value={s.score} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">🌱 สิ่งที่ควรพัฒนา</h2>
            <div className="space-y-3">
              {result.growthAreas.map((g, i) => (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex gap-3"
                >
                  <span className="text-amber-500 mt-0.5">•</span>
                  <div>
                    <p className="font-medium">{g.name}</p>
                    <p className="text-sm text-muted-foreground">{g.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push("/dashboard")}>
              ไปที่ Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-3 border-b px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">{t("title")}</h1>
          <p className="text-xs text-muted-foreground">
            {t("progress", { current: userMessageCount, total: TOTAL_QUESTIONS })}
          </p>
        </div>
      </header>

      <Progress value={progress} className="h-1 rounded-none" />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-muted rounded-2xl px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </motion.div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="border-t px-4 py-3">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="พิมพ์คำตอบของคุณ..."
            className="min-h-[44px] max-h-32 resize-none"
            rows={1}
            disabled={loading}
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
