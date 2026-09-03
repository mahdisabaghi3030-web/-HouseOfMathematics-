"use client";

export type Question = {
  id: string;
  number: number;
  type: "test" | "descriptive";
  prompt: string;
  choices?: string[];
};

export default function ExamQuestionCard({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="bg-white border border-line rounded-sheet p-5">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 shrink-0 rounded-full bg-ink text-paper text-sm flex items-center justify-center font-mono">
          {question.number}
        </span>
        <p className="leading-8">{question.prompt}</p>
      </div>

      <div className="mt-4 mr-10">
        {question.type === "test" && question.choices ? (
          <div className="grid gap-2">
            {question.choices.map((choice, i) => (
              <label
                key={i}
                className={`flex items-center gap-2 border rounded-sheet px-3 py-2 cursor-pointer transition ${
                  value === choice
                    ? "border-gold bg-gold/10"
                    : "border-line hover:bg-paper"
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  className="accent-gold"
                  checked={value === choice}
                  onChange={() => onChange(choice)}
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>
        ) : (
          <textarea
            className="w-full border border-line rounded-sheet p-3 min-h-[120px] ruled-sheet leading-9 focus:border-gold"
            placeholder="پاسخ تشریحی خود را بنویسید..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
