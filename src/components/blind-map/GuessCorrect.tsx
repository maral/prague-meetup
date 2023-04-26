import { Check } from "react-bootstrap-icons";

interface GuessCorrectProps {
  name: string;
}

export default function GuessCorrect({ name }: GuessCorrectProps) {
  return (
    <li className="flex h-8 items-center gap-2">
      <span className="rounded-xl bg-green-600">
        <Check size={18} color="white" />
      </span>{" "}
      {name}
    </li>
  );
}
