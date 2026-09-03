"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("راهنمایی");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setLoading(false);
      setError("ثبت‌نام انجام نشد. ایمیل ممکن است قبلاً استفاده شده باشد.");
      return;
    }

    // ایجاد پروفایل کاربر در جدول profiles (نگاه کنید به supabase/schema.sql)
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: fullName,
      grade,
      score: 0,
    });

    setLoading(false);

    if (profileError) {
      setError("حساب ساخته شد ولی پروفایل ذخیره نشد: " + profileError.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <h1 className="text-2xl font-bold mb-6">ساخت حساب کاربری</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">نام و نام‌خانوادگی</label>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">مقطع تحصیلی</label>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          >
            <option>راهنمایی</option>
            <option>دبیرستان</option>
            <option>دانشگاه</option>
          </select>
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          />
        </div>
        {error && <p className="text-wrong text-sm">{error}</p>}
        <button
          disabled={loading}
          className="w-full bg-gold text-board font-bold py-3 rounded-sheet hover:brightness-110 transition disabled:opacity-60"
        >
          {loading ? "در حال ساخت حساب..." : "ثبت‌نام"}
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-4">
        قبلاً ثبت‌نام کرده‌ای؟{" "}
        <Link href="/login" className="text-board font-semibold">
          وارد شو
        </Link>
      </p>
    </div>
  );
}
