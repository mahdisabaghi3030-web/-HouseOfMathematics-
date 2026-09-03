"use client";

import { useState } from "react";
import Timer from "@/components/Timer";
import ExamQuestionCard, { Question } from "@/components/ExamQuestionCard";

// نکته: در نسخه‌ی نهایی این سوالات باید از جدول questions در Supabase
// بر اساس exam_id خوانده شوند. فعلاً برای نمایش ساختار، داده‌ی نمونه است.
const mockQuestions: Question[] = [
  {
    id: "q1",
    number: 1,
    type: "test",
    prompt: "حاصل sin(90°) کدام است؟",
    choices: ["0", "1", "-1", "0.5"],
  },
  {
    id: "q2",
    number: 2,
    type: "test",
    prompt: "کدام رابطه‌ی مثلثاتی همیشه برقرار است؟",
    choices: [
      "sin²x + cos²x = 1",
      "sin x = cos x",
      "tan x = 1",
      "sin x + cos x = 1",
    ],
  },
  {
    id: "q3",
    number: 3,
    type: "descriptive",
    prompt: "معادله‌ی sin(x) = 1/2 را در بازه‌ی [0, 2π] حل کنید.",
  },
];

export default function ExamTakingPage({
  params,
}: {
  params: { id: string };
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expired, setExpired] = useState(false);

  function handleSubmit() {
    setSubmitted(true);
    // نکته: در نسخه‌ی نهایی، نتیجه باید در جدول exam_attempts در Supabase ذخیره
    // و امتیاز/سطح کاربر بر اساس آن به‌روزرسانی شود.
  }

  if (submitted || expired) {
    const answeredCount = Object.keys(answers).length;
    return (
      <div className="max-w-2xl mx-auto px-5 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">
          {expired ? "زمان آزمون به پایان رسید" : "آزمون ثبت شد"}
        </h1>
        <p className="text-ink/60 mb-8">
          {answeredCount} از {mockQuestions.length} سوال پاسخ داده شد.
        </p>
        <div className="bg-white border border-line rounded-sheet p-6 text-right">
          <p className="text-sm text-ink/60">
            نتیجه‌ی نهایی (درست/غلط/امتیاز) پس از اتصال به Supabase و تصحیح
            خودکار سوالات تستی به‌صورت آنی نمایش داده خواهد شد. سوالات تشریحی
            نیاز به تصحیح دستی یا هوش مصنوعی دارند که در مرحله‌ی بعد اضافه
            می‌شود.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <div className="flex items-center justify-between mb-6 sticky top-16 bg-paper py-3 z-10 dotted-divider">
        <h1 className="font-bold">آزمون جامع مثلثات</h1>
        <Timer minutes={45} onExpire={() => setExpired(true)} />
      </div>

      <div className="space-y-5">
        {mockQuestions.map((q) => (
          <ExamQuestionCard
            key={q.id}
            question={q}
            value={answers[q.id] || ""}
            onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-board text-paper font-bold py-3 rounded-sheet hover:brightness-110 transition"
      >
        پایان و ثبت آزمون
      </button>
    </div>
  );
}
