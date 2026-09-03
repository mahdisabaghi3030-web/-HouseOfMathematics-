import { mockLeaderboard } from "@/lib/mockData";

export default function LeaderboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-2">رقابت و رتبه‌بندی</h1>
      <p className="text-ink/60 mb-8">
        امتیاز از مجموع آزمون‌های شرکت‌کرده و درصد پاسخ درست محاسبه می‌شود.
      </p>

      <div className="bg-white border border-line rounded-sheet overflow-hidden">
        {mockLeaderboard.map((u) => (
          <div
            key={u.rank}
            className="flex items-center justify-between px-5 py-4 dotted-divider last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono font-bold text-gold w-6 text-lg">
                {u.rank}
              </span>
              <div>
                <div className="font-semibold">{u.name}</div>
                <div className="text-xs text-ink/50">{u.level}</div>
              </div>
            </div>
            <span className="font-mono text-ink/70">{u.score} امتیاز</span>
          </div>
        ))}
      </div>
    </div>
  );
}
