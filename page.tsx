import Link from "next/link";
import { mockExams, mockLeaderboard } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-board text-paper">
        <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.4]">
              ریاضی را همان‌جا که
              <br />
              <span className="text-gold">امتحان می‌شوی</span> تمرین کن
            </h1>
            <p className="mt-6 text-paper/80 leading-8 max-w-md">
              آزمون‌های زمان‌دار، سوالات تستی و تشریحی، پیگیری کتاب‌ها و
              رقابت با دیگران — برای راهنمایی، دبیرستان و دانشگاه.
            </p>
            <div className="mt-8 flex gap-3">
              <Link
                href="/register"
                className="bg-gold text-board font-bold px-6 py-3 rounded-sheet hover:brightness-110 transition"
              >
                شروع رایگان
              </Link>
              <Link
                href="/exams"
                className="border border-paper/40 px-6 py-3 rounded-sheet hover:bg-paper/10 transition"
              >
                دیدن آزمون‌ها
              </Link>
            </div>
          </div>

          {/* stylized exam sheet visual */}
          <div className="bg-paper text-ink rounded-sheet p-6 shadow-2xl -rotate-1">
            <div className="flex justify-between items-center dotted-divider pb-3 mb-3 text-sm">
              <span className="font-mono">آزمون مثلثات</span>
              <span className="font-mono font-bold text-wrong">۱۲:۴۵</span>
            </div>
            <div className="space-y-3 text-sm">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-ink text-paper text-xs flex items-center justify-center shrink-0 font-mono">
                    {n}
                  </span>
                  <div className="flex-1">
                    <div className="h-2.5 bg-line rounded w-full mb-2" />
                    <div className="h-2.5 bg-line rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections overview */}
      <section className="max-w-6xl mx-auto px-5 py-16 grid gap-6 md:grid-cols-4">
        {[
          { href: "/exams", title: "آزمون‌ها", desc: "تست و تشریحی، زمان‌دار" },
          { href: "/learn", title: "آموزش", desc: "مفاهیم و روش حل مسئله" },
          { href: "/books", title: "کتاب‌ها", desc: "پیگیری صفحه و سوال" },
          { href: "/leaderboard", title: "رقابت", desc: "رتبه‌بندی کاربران" },
        ].map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="border border-line bg-white rounded-sheet p-5 hover:border-gold transition"
          >
            <div className="font-bold text-lg mb-1">{s.title}</div>
            <div className="text-sm text-ink/60">{s.desc}</div>
          </Link>
        ))}
      </section>

      {/* Exams preview */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-bold">آزمون‌های پرطرفدار</h2>
          <Link href="/exams" className="text-sm text-board hover:text-gold">
            مشاهده همه
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mockExams.map((e) => (
            <Link
              key={e.id}
              href={`/exams/${e.id}`}
              className="bg-white border border-line rounded-sheet p-5 hover:border-gold transition"
            >
              <div className="text-xs text-ink/50 mb-1">
                {e.grade} · {e.topic}
              </div>
              <div className="font-bold mb-3">{e.title}</div>
              <div className="flex justify-between text-xs text-ink/60 font-mono">
                <span>{e.questionCount} سوال</span>
                <span>{e.duration} دقیقه</span>
                <span>{e.participants} شرکت‌کننده</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Leaderboard preview */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-2xl font-bold mb-5">برترین‌های این هفته</h2>
        <div className="bg-white border border-line rounded-sheet overflow-hidden">
          {mockLeaderboard.slice(0, 5).map((u) => (
            <div
              key={u.rank}
              className="flex items-center justify-between px-5 py-3 dotted-divider last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-gold w-5">
                  {u.rank}
                </span>
                <span>{u.name}</span>
              </div>
              <span className="font-mono text-sm text-ink/60">
                {u.score} امتیاز
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
