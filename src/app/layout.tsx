import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TURFu',
  description: 'Infrastructure for the next paradigm',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
