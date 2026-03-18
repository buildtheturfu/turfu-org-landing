interface ProseLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProseLayout({ children, className = '' }: ProseLayoutProps) {
  return (
    <div className={`max-w-prose mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
