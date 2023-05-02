interface PanelTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PanelH1({ className, children }: PanelTitleProps) {
  return (
    <h1
      className={`mb-4 font-lead text-xl text-indigo-700 lg:mb-6 lg:text-3xl ${
        className ?? ""
      }`}
    >
      {children}
    </h1>
  );
}
