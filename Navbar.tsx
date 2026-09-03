"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/exams", label: "آزمون‌ها" },
  { href: "/learn", label: "آموزش" },
  { href: "/books", label: "کتاب‌ها" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/leaderboard", label: "رقابت" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-board text-paper sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-sheet bg-gold text-board flex items-center justify-center font-bold text-lg">
            خ
          </span>
          <span className="font-bold text-lg">خانه ریاضیات</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm hover:text-gold transition-colors"
          >
            ورود
          </Link>
          <Link
            href="/register"
            className="text-sm bg-gold text-board px-4 py-2 rounded-sheet font-semibold hover:brightness-110 transition"
          >
            ثبت‌نام رایگان
          </Link>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="باز کردن منو"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-boardLight px-5 py-4 flex flex-col gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="dotted-divider pt-3 flex flex-col gap-3">
            <Link href="/login" onClick={() => setOpen(false)}>
              ورود
            </Link>
            <Link href="/register" onClick={() => setOpen(false)}>
              ثبت‌نام رایگان
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
