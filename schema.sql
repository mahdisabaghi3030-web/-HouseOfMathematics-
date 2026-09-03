-- ============================================================
-- خانه ریاضیات — اسکیمای دیتابیس Supabase (Postgres)
-- این فایل را در Supabase → SQL Editor کپی و اجرا کن
-- ============================================================

-- پروفایل کاربران (تکمیل‌کننده‌ی auth.users داخلی Supabase)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  grade text not null check (grade in ('راهنمایی', 'دبیرستان', 'دانشگاه')),
  score integer not null default 0,
  created_at timestamptz not null default now()
);

-- سطح‌بندی بر اساس امتیاز (view، نیازی به جدول جدا نیست)
create or replace view profile_levels as
select
  id,
  full_name,
  score,
  case
    when score >= 900 then 'استاد'
    when score >= 500 then 'ماهر'
    when score >= 200 then 'کوشا'
    else 'نوپا'
  end as level
from profiles;

-- آزمون‌ها
create table exams (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  grade text not null check (grade in ('راهنمایی', 'دبیرستان', 'دانشگاه')),
  topic text not null,
  difficulty text not null check (difficulty in ('آسان', 'متوسط', 'سخت')),
  duration_minutes integer not null,
  created_at timestamptz not null default now()
);

-- سوالات هر آزمون (تستی یا تشریحی)
create table questions (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references exams(id) on delete cascade,
  number integer not null,
  type text not null check (type in ('test', 'descriptive')),
  prompt text not null,
  choices jsonb,               -- فقط برای سوالات تستی: آرایه‌ای از گزینه‌ها
  correct_choice text,         -- فقط برای سوالات تستی
  points integer not null default 10
);

-- تلاش‌های کاربر برای هر آزمون
create table exam_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  exam_id uuid not null references exams(id) on delete cascade,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score integer,
  correct_count integer,
  wrong_count integer
);

-- پاسخ‌های ثبت‌شده در هر تلاش
create table attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references exam_attempts(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  answer text,
  is_correct boolean
);

-- کتاب‌ها
create table books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text,
  total_pages integer not null,
  grade text
);

-- پیشرفت مطالعه‌ی هر کاربر در هر کتاب
create table book_progress (
  user_id uuid not null references profiles(id) on delete cascade,
  book_id uuid not null references books(id) on delete cascade,
  pages_read integer not null default 0,
  solved integer not null default 0,
  correct integer not null default 0,
  wrong integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

-- مقالات آموزشی (ریاضیات چیست، معنی لغوی، حل مسئله و ...)
create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  created_at timestamptz not null default now()
);

-- دوره‌ها و لینک‌های آموزشی
create table courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  provider text,
  url text not null,
  grade text
);

-- ============================================================
-- Row Level Security (هر کاربر فقط داده‌ی خودش را ببیند/ویرایش کند)
-- ============================================================
alter table profiles enable row level security;
alter table exam_attempts enable row level security;
alter table attempt_answers enable row level security;
alter table book_progress enable row level security;

create policy "کاربر پروفایل خودش را می‌بیند/ویرایش می‌کند"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- برای رتبه‌بندی عمومی، فقط نام و امتیاز باید عمومی خوانده شود:
create policy "همه می‌توانند نام و امتیاز را برای رتبه‌بندی ببینند"
  on profiles for select
  using (true);

create policy "کاربر فقط تلاش‌های خودش را می‌بیند"
  on exam_attempts for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "کاربر فقط پاسخ‌های تلاش خودش را می‌بیند"
  on attempt_answers for all
  using (
    exists (
      select 1 from exam_attempts
      where exam_attempts.id = attempt_answers.attempt_id
      and exam_attempts.user_id = auth.uid()
    )
  );

create policy "کاربر فقط پیشرفت کتاب خودش را می‌بیند/ویرایش می‌کند"
  on book_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- جداول عمومی (exams, questions, books, articles, courses) نیازی به RLS محدودکننده ندارند
-- چون فقط خواندنی هستند برای همه‌ی بازدیدکنندگان.
