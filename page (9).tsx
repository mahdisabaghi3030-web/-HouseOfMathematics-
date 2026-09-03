"use client";

import { useState } from "react";
import { mockBooks } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const book = mockBooks.find((b) => b.id === params.id);
  if (!book) return notFound();

  const [pagesRead, setPagesRead] = useState(book.pagesRead);
  const [solved, setSolved] = useState(book.solved);
  const [correct, setCorrect] = useState(book.correct);
  const [wrong, setWrong] = useState(book.wrong);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // نکته: در نسخه‌ی نهایی این مقادیر باید با upsert در جدول book_progress
    // در Supabase ذخیره شوند (کلید: user_id + book_id).
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const pct = Math.round((pagesRead / book.totalPages) * 100);

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-1">{book.title}</h1>
      <p className="text-ink/50 text-sm mb-8">{book.author}</p>

      <div className="bg-white border border-line rounded-sheet p-6 mb-6">
        <div className="w-full h-2 bg-line rounded-full overflow-hidden mb-2">
          <div className="h-full bg-correct" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-sm text-ink/60 font-mono">
          {pagesRead} از {book.totalPages} صفحه ({pct}٪)
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white border border-line rounded-sheet p-6 space-y-4"
      >
        <h2 className="font-bold mb-2">به‌روزرسانی پیشرفت</h2>

        <div>
          <label className="block text-sm mb-1">صفحات مطالعه‌شده</label>
          <input
            type="number"
            min={0}
            max={book.totalPages}
            value={pagesRead}
            onChange={(e) => setPagesRead(Number(e.target.value))}
            className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm mb-1">زده‌شده</label>
            <input
              type="number"
              min={0}
              value={solved}
              onChange={(e) => setSolved(Number(e.target.value))}
              className="w-full border border-line rounded-sheet px-3 py-2 focus:border-gold"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-correct">درست</label>
            <input
              type="number"
              min={0}
              value={correct}
              onChange={(e) => setCorrect(Number(e.target.value))}
              className="w-full border border-line rounded-sheet px-3 py-2 focus:border-correct"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-wrong">غلط</label>
            <input
              type="number"
              min={0}
              value={wrong}
              onChange={(e) => setWrong(Number(e.target.value))}
              className="w-full border border-line rounded-sheet px-3 py-2 focus:border-wrong"
            />
          </div>
        </div>

        <button className="w-full bg-board text-paper font-bold py-3 rounded-sheet hover:brightness-110 transition">
          {saved ? "ذخیره شد ✓" : "ذخیره‌ی پیشرفت"}
        </button>
      </form>
    </div>
  );
}
