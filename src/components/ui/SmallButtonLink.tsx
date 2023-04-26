import { UIProps } from "@/types/ui";

interface SmallButtonProps extends UIProps {
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
      className={`inline-flex items-center rounded-lg bg-indigo-700 px-3 py-2 text-center text-sm text-white transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 hover:bg-indigo-800 ${
        className ?? ""
      }`}
    >
      {children}
    </a>
  );
}
