import { UiProps } from "@/types/ui";

interface SmallButtonProps extends UiProps {
  href: string;
  children: React.ReactNode;
}

export default function SmallButtonLink({
  href,
  children,
  className,
}: SmallButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      className={`inline-flex items-center rounded-lg border-2 border-indigo-700 bg-indigo-100 px-2.5 py-1.5 text-center text-sm text-indigo-700 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:bg-indigo-200 ${
        className ?? ""
      }`}
    >
      {children}
    </a>
  );
}
