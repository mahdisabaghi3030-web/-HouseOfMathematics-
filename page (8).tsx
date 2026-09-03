import LevelBadge from "@/components/LevelBadge";
import { mockBooks } from "@/lib/mockData";

// نکته: در نسخه‌ی نهایی، این داده‌ها باید از Supabase (جدول profiles، exam_attempts، book_progress)
// با استفاده از session کاربر لاگین‌شده خوانده شوند.
const mockUser = {
  fullName: "کاربر مهمان",
  grade: "دبیرستان",
  score: 640,
  examsTaken: 12,
  correctAnswers: 148,
  wrongAnswers: 42,
};

export default function DashboardPage() {
  const accuracy = Math.round(
    (mockUser.correctAnswers /
      (mockUser.correctAnswers + mockUser.wrongAnswers)) *
      100
  );

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">{mockUser.fullName}</h1>
          <p className="text-ink/60 text-sm">{mockUser.grade}</p>
        </div>
        <LevelBadge score={mockUser.score} />
      </div>

      <div className="grid gap-4 sm:grid-cols-4 mb-10">
        {[
          { label: "امتیاز کل", value: mockUser.score },
          { label: "آزمون‌های شرکت‌کرده", value: mockUser.examsTaken },
          { label: "درصد پاسخ درست", value: `${accuracy}٪` },
          {
            label: "پاسخ‌های ثبت‌شده",
            value: mockUser.correctAnswers + mockUser.wrongAnswers,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-line rounded-sheet p-4 text-center"
          >
            <div className="text-2xl font-bold font-mono">{s.value}</div>
            <div className="text-xs text-ink/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-3">پیشرفت کتاب‌ها</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mockBooks.map((b) => {
          const pct = Math.round((b.pagesRead / b.totalPages) * 100);
          return (
            <div
              key={b.id}
              className="bg-white border border-line rounded-sheet p-4"
            >
              <div className="font-semibold mb-2">{b.title}</div>
              <div className="w-full h-2 bg-line rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-correct"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-xs text-ink/60 font-mono">
                {b.pagesRead} از {b.totalPages} صفحه ({pct}٪)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
