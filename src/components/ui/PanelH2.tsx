interface PanelTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PanelH2({ className, children }: PanelTitleProps) {
  return (
    <h2
      className={`mb-4 font-lead text-lg text-indigo-700 lg:mb-6 lg:text-xl ${
        className ?? ""
      }`}
    >
      {children}
    </h2>
  );
}
