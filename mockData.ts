export const levels = [
  { name: "نوپا", min: 0, color: "#B84C3E" },
  { name: "کوشا", min: 200, color: "#C9A227" },
  { name: "ماهر", min: 500, color: "#2F7A5C" },
  { name: "استاد", min: 900, color: "#16233D" },
];

export const mockExams = [
  {
    id: "exam-1",
    title: "آزمون جامع مثلثات - دبیرستان",
    grade: "دبیرستان",
    topic: "مثلثات",
    duration: 45,
    questionCount: 15,
    participants: 342,
    difficulty: "متوسط",
  },
  {
    id: "exam-2",
    title: "آزمون توابع و حد - دانشگاه",
    grade: "دانشگاه",
    topic: "حسابان",
    duration: 60,
    questionCount: 20,
    participants: 198,
    difficulty: "سخت",
  },
  {
    id: "exam-3",
    title: "آزمون اعداد صحیح - راهنمایی",
    grade: "راهنمایی",
    topic: "اعداد",
    duration: 25,
    questionCount: 10,
    participants: 511,
    difficulty: "آسان",
  },
];

export const mockArticles = [
  {
    slug: "riazi-chist",
    title: "ریاضیات چیست؟",
    excerpt:
      "نگاهی به تعریف ریاضیات، جایگاه آن در علوم دیگر و اینکه چرا آن را زبان جهان می‌نامند.",
  },
  {
    slug: "manaye-loghavi-riazi",
    title: "معنی لغوی ریاضی چیست؟",
    excerpt:
      "ریشه‌ی واژه‌ی «ریاضی» در زبان عربی و فارسی و ارتباط آن با مفهوم تمرین و ورزش ذهن.",
  },
  {
    slug: "amoozeshe-hale-masale",
    title: "آموزش حل مسئله",
    excerpt:
      "روش چهار مرحله‌ای پویا برای حل مسئله‌های ریاضی: فهم مسئله، طرح‌ریزی، اجرا و بازبینی.",
  },
];

export const mockBooks = [
  {
    id: "book-1",
    title: "ریاضی پایه دهم",
    author: "سازمان پژوهش و برنامه‌ریزی آموزشی",
    totalPages: 180,
    pagesRead: 92,
    solved: 140,
    correct: 110,
    wrong: 30,
  },
  {
    id: "book-2",
    title: "حسابان ۱",
    author: "سازمان پژوهش و برنامه‌ریزی آموزشی",
    totalPages: 210,
    pagesRead: 40,
    solved: 55,
    correct: 38,
    wrong: 17,
  },
];

export const mockCourses = [
  {
    id: "course-1",
    title: "دوره‌ی رایگان مثلثات کاربردی",
    provider: "—",
    url: "#",
  },
];

export const mockLeaderboard = [
  { rank: 1, name: "علی رضایی", level: "استاد", score: 1420 },
  { rank: 2, name: "سارا احمدی", level: "ماهر", score: 1180 },
  { rank: 3, name: "محمد کاظمی", level: "ماهر", score: 990 },
  { rank: 4, name: "نگار موسوی", level: "کوشا", score: 640 },
  { rank: 5, name: "امیر حسینی", level: "کوشا", score: 510 },
];
