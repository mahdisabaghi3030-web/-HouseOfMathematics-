"use client";

import { useEffect, useState } from "react";

export default function Timer({
  minutes,
  onExpire,
}: {
  minutes: number;
  onExpire?: () => void;
}) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire?.();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, onExpire]);

  const mm = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");
  const low = secondsLeft < 60;

  return (
    <div
      className={`font-mono text-lg font-bold px-3 py-1.5 rounded-sheet border ${
        low
          ? "border-wrong text-wrong bg-wrong/10"
          : "border-board text-board bg-paper"
      }`}
      role="timer"
      aria-live="polite"
    >
      {mm}:{ss}
    </div>
  );
}
