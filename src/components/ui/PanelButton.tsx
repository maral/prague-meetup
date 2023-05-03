import Link from "next/link";

interface PanelButtonProps {
  title: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export function PanelButton({
  title,
  subtitle,
  className,
  onClick,
  href,
  disabled = false,
}: PanelButtonProps) {
  const composedClassName = `block tracking-wider text-center rounded-lg p-4 text-indigo-100
  shadow-md shadow-indigo-400/50 transition-all
  ${disabled ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-500 hover:text-indigo-50"}
  ${
    className ? className : ""
  }`;

  const content = (
    <>
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-indigo-100">{subtitle}</div>}
    </>
  );

  return disabled ? (
    <button className={composedClassName} disabled={disabled}>
      {content}
    </button>
  ) : onClick ? (
    <button className={composedClassName} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link href={href ?? "#"} className={composedClassName}>
      {content}
    </Link>
  );
}
