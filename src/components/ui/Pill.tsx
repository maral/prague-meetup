import { UiProps as UiProps } from "@/types/ui";

interface PillProps extends UiProps {
  children: React.ReactNode;
}

export default function Pill({ children, className }: PillProps) {
  return (
    <span
      className={`mx-0.5 inline-block rounded-md bg-indigo-700 px-3 py-1 font-bold text-white ${
        className ?? ""
      }`}
    >
      {children}
    </span>
  );
}
