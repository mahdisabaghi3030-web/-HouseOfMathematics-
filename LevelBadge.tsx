import { levels } from "@/lib/mockData";

export default function LevelBadge({ score }: { score: number }) {
  const current = [...levels].reverse().find((l) => score >= l.min) || levels[0];

  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sheet text-sm font-semibold text-paper"
      style={{ backgroundColor: current.color }}
    >
      سطح {current.name}
    </span>
  );
}
