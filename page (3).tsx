import Link from "next/link";
import { mockExams } from "@/lib/mockData";

export default function ExamsPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">آزمون‌ها</h1>
      <p className="text-ink/60 mb-8">
        آزمون تستی و تشریحی زمان‌دار، برای راهنمایی، دبیرستان و دانشگاه.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {mockExams.map((e) => (
          <Link
            key={e.id}
            href={`/exams/${e.id}`}
            className="bg-white border border-line rounded-sheet p-5 hover:border-gold transition"
          >
            <div className="text-xs text-ink/50 mb-1">
              {e.grade} · {e.topic} · سطح {e.difficulty}
            </div>
            <div className="font-bold mb-4">{e.title}</div>
            <div className="flex justify-between text-xs text-ink/60 font-mono dotted-divider pt-3">
              <span>{e.questionCount} سوال</span>
              <span>{e.duration} دقیقه</span>
              <span>{e.participants} شرکت‌کننده</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
