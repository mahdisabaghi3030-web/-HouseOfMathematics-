"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError("ایمیل یا رمز عبور اشتباه است.");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-2xl font-bold mb-6">ورود به حساب</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">ایمیل</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">رمز عبور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          />
        </div>
        {error && <p className="text-wrong text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-board text-paper font-bold py-3 rounded-sheet hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-4">
        حساب نداری؟{" "}
        <Link href="/register" className="text-board font-semibold">
          ثبت‌نام کن
        </Link>
      </p>
    </div>
  );
}
