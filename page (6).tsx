import { mockArticles } from "@/lib/mockData";
import { notFound } from "next/navigation";

// نکته: محتوای کامل مقالات باید بعداً از جدول articles در Supabase خوانده شود.
// شما (کاربر) قرار است بعداً منابع و متن کامل هر مقاله را ارسال کنید.
export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = mockArticles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <div className="bg-white border border-line rounded-sheet p-6 leading-9 text-ink/80">
        <p>{article.excerpt}</p>
        <p className="mt-4 text-sm text-ink/50">
          محتوای کامل این مقاله بعداً اضافه می‌شود.
        </p>
      </div>
    </div>
  );
}
