import { Question } from "react-bootstrap-icons";

export default function GuessUnknown() {
  return (
    <li className="flex h-8 items-center gap-2">
      <span className="rounded-xl bg-gray-500">
        <Question size={18} color="white" />
      </span>

      <span className="inline-block h-5 w-32 border-b-2 border-dashed border-gray-400"></span>
    </li>
  );
}
