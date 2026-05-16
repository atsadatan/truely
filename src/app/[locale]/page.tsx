"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Target, BookOpen, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const t = useTranslations("landing");
  const common = useTranslations("common");

  const features = [
    {
      icon: Sparkles,
      title: "AI Adaptive Assessment",
      titleTh: "แบบประเมิน AI",
      desc: "Personalized questions that adapt to you",
      descTh: "คำถามที่ปรับตามคำตอบของคุณ",
    },
    {
      icon: Target,
      title: "Strengths Dashboard",
      titleTh: "Dashboard จุดแข็ง",
      desc: "See your top strengths and growth areas",
      descTh: "ดูจุดแข็งและสิ่งที่ควรพัฒนา",
    },
    {
      icon: BookOpen,
      title: "Reflection Journal",
      titleTh: "Journal สะท้อนตัวเอง",
      desc: "AI finds patterns in your reflections",
      descTh: "AI วิเคราะห์ pattern จากสิ่งที่คุณเขียน",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-xl font-bold tracking-tight">
          {common("appName")}
        </span>
        <Link href="/login">
          <Button variant="ghost" size="sm">
            {t("login")}
          </Button>
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t("hero")}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2">
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-24 grid max-w-4xl gap-8 sm:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.titleTh}</h3>
              <p className="text-sm text-muted-foreground">{feature.descTh}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        &copy; 2026 {common("appName")}. All rights reserved.
      </footer>
    </div>
  );
}
