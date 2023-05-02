import Link from "next/link";

interface PanelButtonProps {
  title: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function PanelButton({
  title,
  subtitle,
  className,
  onClick,
  href,
}: PanelButtonProps) {
  const composedClassName = `block tracking-wider text-center rounded-lg bg-indigo-700 p-4 text-indigo-100
  shadow-md shadow-indigo-400/50 transition-all hover:bg-indigo-500 hover:text-indigo-50 ${
    className ? className : ""
  }`;

  const content = (
    <>
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-indigo-100">{subtitle}</div>}
    </>
  );

  return onClick ? (
    <button className={composedClassName} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link href={href ?? "#"} className={composedClassName}>
      {content}
    </Link>
  );
}
