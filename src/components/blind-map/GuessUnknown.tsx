import { Question } from "react-bootstrap-icons";

export default function GuessUnknown() {
  return (
    <li className="flex h-8 items-center gap-2">
      <span className="rounded-xl bg-gray-500">
        <Question size={18} color="white" />
      </span>

      <span className="inline-block h-4 w-20 border-b-2 border-dashed border-gray-500"></span>
    </li>
  );
}
