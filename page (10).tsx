import Link from "next/link";
import { mockBooks } from "@/lib/mockData";

export default function BooksPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">کتاب‌ها</h1>
      <p className="text-ink/60 mb-8">
        برای هر کتاب، صفحات مطالعه‌شده و تعداد سوالات زده‌شده، درست و غلط را
        پیگیری کن.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {mockBooks.map((b) => {
          const pct = Math.round((b.pagesRead / b.totalPages) * 100);
          return (
            <Link
              key={b.id}
              href={`/books/${b.id}`}
              className="bg-white border border-line rounded-sheet p-5 hover:border-gold transition"
            >
              <div className="font-bold mb-1">{b.title}</div>
              <div className="text-xs text-ink/50 mb-3">{b.author}</div>
              <div className="w-full h-2 bg-line rounded-full overflow-hidden mb-1">
                <div
                  className="h-full bg-correct"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="text-xs text-ink/60 font-mono">
                {b.pagesRead}/{b.totalPages} صفحه
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
