import { UiProps as UiProps } from "@/types/ui";
import Link from "next/link";

interface ExternalLinkProps extends UiProps {
  href: string;
  children: React.ReactNode;
}

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className={`text-blue-600 hover:underline ${className ?? ""}`}
    >
      {children}
    </Link>
  );
}
