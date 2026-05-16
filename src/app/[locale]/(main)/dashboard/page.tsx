"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Target, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const common = useTranslations("common");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<{ display_name: string | null } | null>(null);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();
      setProfile(profile);

      const { data: assessments } = await supabase
        .from("assessments")
        .select("id, status")
        .eq("user_id", user.id)
        .eq("status", "completed")
        .limit(1);
      setHasAssessment(!!assessments?.length);
    }

    load();
  }, [router]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!user) return null;

  const displayName = profile?.display_name || user.user_metadata?.display_name || "Friend";

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold">
              สวัสดี, {displayName} 👋
            </h1>
            <p className="text-sm text-muted-foreground">{common("tagline")}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </motion.div>

        {!hasAssessment ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-4 pt-8 pb-8 text-center">
                <Sparkles className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-semibold">เริ่มค้นหาตัวเอง</h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                  ทำแบบประเมิน AI เพื่อค้นพบจุดแข็ง จุดอ่อน และสิ่งที่เหมาะกับคุณ
                </p>
                <Link href="/assessment">
                  <Button size="lg" className="mt-2">
                    เริ่มทำแบบประเมิน
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {t("strengths")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ผลประเมินจะแสดงที่นี่
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    {t("recentJournal")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    ยังไม่มี journal
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
