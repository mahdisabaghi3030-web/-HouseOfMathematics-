import { mockCourses } from "@/lib/mockData";

export default function CoursesPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">دوره‌ها و لینک‌های آموزشی</h1>
      <p className="text-ink/60 mb-8">
        مجموعه‌ای از دوره‌ها و منابع آموزشی خارجی. منابع دقیق را بعداً ارسال
        کن تا اینجا اضافه شود.
      </p>

      <div className="grid gap-3">
        {mockCourses.map((c) => (
          <a
            key={c.id}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-line rounded-sheet p-4 flex items-center justify-between hover:border-gold transition"
          >
            <span className="font-semibold">{c.title}</span>
            <span className="text-ink/40 text-sm">مشاهده ←</span>
          </a>
        ))}
      </div>
    </div>
  );
}
