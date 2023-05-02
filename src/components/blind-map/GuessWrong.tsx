import { Check, X } from "react-bootstrap-icons";

interface GuessWrongProps {
  wrong: string;
  correct: string;
}

export default function GuessWrong({ wrong, correct }: GuessWrongProps) {
  return (
    <li className="flex h-8 items-center justify-between">
      <span className="flex grow items-center gap-2">
        <span className="rounded-xl bg-rose-500">
          <X size={18} color="white" strokeWidth={2} />
        </span>{" "}
        {correct}
      </span>
      <span className="ml-1 basis-[50%] text-gray-400">tvůj tip: {wrong}</span>
    </li>
  );
}
