export function PanelButton({
  title,
  subtitle,
  className,
  onClick,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`block rounded-lg border-2 border-indigo-300 bg-indigo-200 p-4 text-indigo-950 shadow-md shadow-indigo-400/50 transition-all hover:scale-105 hover:border-indigo-400 hover:bg-indigo-300 ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-sm text-indigo-800">{subtitle}</div>}
    </button>
  );
}
