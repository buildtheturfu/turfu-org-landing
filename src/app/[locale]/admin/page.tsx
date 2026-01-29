import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAuthCookieName } from '@/lib/auth';
import AdminDashboard from '@/components/admin/AdminDashboard';

interface Props {
  params: { locale: string };
}

export default function AdminPage({ params: { locale } }: Props) {
  const cookieStore = cookies();
  const authCookie = cookieStore.get(getAuthCookieName());

  if (!authCookie || authCookie.value !== 'authenticated') {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminDashboard locale={locale} />;
}

export const metadata = {
  title: 'Admin - TURFu',
  robots: { index: false, follow: false },
};
