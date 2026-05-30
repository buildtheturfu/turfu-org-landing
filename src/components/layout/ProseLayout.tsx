interface ProseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProseLayout({ children, className = '' }: ProseLayoutProps) {
  return (
    <div
      className={`w-full max-w-prose mx-auto px-4 sm:px-6 lg:px-8 min-w-0 ${className}`}
    >
      {children}
    </div>
  );
}
