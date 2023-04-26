interface PanelTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PanelTitle({ className, children }: PanelTitleProps) {
  return (
    <h2
      className={`mb-4 font-lead text-xl text-indigo-700 lg:mb-6 lg:text-lg ${
        className ?? ""
      }`}
    >
      {children}
    </h2>
  );
}
