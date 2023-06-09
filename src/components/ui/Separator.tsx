import { UiProps } from "@/types/ui";

export default function Separator({ className }: UiProps) {
  return (
    <hr
      className={`col-span-2 my-2 border-gray-300 md:col-span-1 ${
        className ?? ""
      }`}
    />
  );
}
