import { getArticles, getCategories } from '@/lib/articles';
import Navbar from '@/components/Navbar';
import ContentSidebar from '@/components/content/ContentSidebar';

export const dynamic = 'force-dynamic';

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function ContentLayout({ children, params: { locale } }: LayoutProps) {
  const articles = await getArticles(locale);
  const categories = await getCategories(locale);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-16 bg-turfu-dark">
        <ContentSidebar
          articles={articles}
          categories={categories}
          locale={locale}
        />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </>
  );
}
