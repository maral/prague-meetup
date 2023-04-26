import { X } from "react-bootstrap-icons";

interface GuessWrongProps {
  name: string;
}

export default function GuessWrong({ name }: GuessWrongProps) {
  return (
    <li className="flex h-8 items-center gap-2">
      <span className="rounded-xl bg-rose-500">
        <X size={18} color="white" strokeWidth={2} />
      </span>{" "}
      {name}
    </li>
  );
}
