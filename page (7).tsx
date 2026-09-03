import Link from "next/link";
import { mockArticles } from "@/lib/mockData";

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">آموزش</h1>
      <p className="text-ink/60 mb-8">
        مفاهیم پایه، معنی و فلسفه‌ی ریاضیات و روش‌های حل مسئله.
      </p>

      <div className="grid gap-4">
        {mockArticles.map((a) => (
          <Link
            key={a.slug}
            href={`/learn/${a.slug}`}
            className="bg-white border border-line rounded-sheet p-5 hover:border-gold transition"
          >
            <div className="font-bold mb-1">{a.title}</div>
            <p className="text-sm text-ink/60">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
