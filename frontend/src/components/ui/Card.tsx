import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-white shadow-md rounded-lg p-5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: SectionProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: SectionProps) {
  return (
    <h2 className={`text-2xl font-semibold text-center ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "" }: SectionProps) {
  return <div className={className}>{children}</div>;
}
