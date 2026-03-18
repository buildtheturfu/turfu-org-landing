interface GridLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function GridLayout({ children, className = '' }: GridLayoutProps) {
  return (
    <div className={`max-w-layout mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}
