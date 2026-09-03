export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 mt-20">
      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div>
          <div className="font-bold text-paper mb-2">خانه ریاضیات</div>
          <p>
            یادگیری، تمرین و رقابت ریاضی برای مقاطع راهنمایی، دبیرستان و
            دانشگاه — در فضایی شبیه آزمون واقعی.
          </p>
        </div>
        <div>
          <div className="font-bold text-paper mb-2">بخش‌ها</div>
          <ul className="space-y-1">
            <li>آزمون‌ها</li>
            <li>آموزش</li>
            <li>کتاب‌ها</li>
            <li>دوره‌ها</li>
            <li>رقابت و رتبه‌بندی</li>
          </ul>
        </div>
        <div>
          <div className="font-bold text-paper mb-2">درباره</div>
          <p>نسخه اولیه — در حال توسعه.</p>
        </div>
      </div>
      <div className="dotted-divider max-w-6xl mx-auto" />
      <div className="text-center text-xs py-4 text-paper/50">
        © {new Date().getFullYear()} خانه ریاضیات
      </div>
    </footer>
  );
}
