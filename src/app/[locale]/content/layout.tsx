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
      <div className="flex min-h-screen pt-16 bg-turfu-dark overflow-x-hidden">
        <ContentSidebar
          articles={articles}
          categories={categories}
          locale={locale}
        />

        {/* Mobile hamburger button - fixed position below navbar */}
        <div className="md:hidden fixed top-20 left-4 z-30">
          <MobileSidebarDrawer
            articles={articles}
            categories={categories}
            locale={locale}
          />
        </div>

        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </>
  );
}
