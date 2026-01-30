import { getArticles, getCategories } from '@/lib/articles';
import Navbar from '@/components/Navbar';
import ContentSidebar from '@/components/content/ContentSidebar';
import MobileSidebarDrawer from '@/components/content/MobileSidebarDrawer';

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
      <div className="min-h-screen pt-16 bg-surface overflow-x-hidden">
        <ContentSidebar
          articles={articles}
          categories={categories}
          locale={locale}
        />
        {/* Mobile hamburger - fixed top-right */}
        <div className="md:hidden fixed top-20 right-4 z-30">
          <MobileSidebarDrawer
            articles={articles}
            categories={categories}
            locale={locale}
          />
        </div>

        <div className="md:ml-72 min-w-0">{children}</div>
      </div>
    </>
  );
}
