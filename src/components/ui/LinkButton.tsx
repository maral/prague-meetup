import { UiProps as UiProps } from "@/types/ui";

interface LinkButtonProps extends UiProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function LinkButton({
  onClick,
  children,
  className,
}: LinkButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-blue-600 hover:underline ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
