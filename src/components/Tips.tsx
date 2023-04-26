import { AreaTips, Tip } from "@/types/tips";
import { useState } from "react";
import SmallButtonLink from "./ui/SmallButtonLink";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import Image from "next/image";

interface TipsProps {
  tips: AreaTips;
}

export default function Tips({ tips }: TipsProps) {
  return tips.culture || tips.nature || tips.food ? (
    <>
      <h3 className="mt-10 font-lead text-xl text-indigo-800">Kam zamířit</h3>
      <div className="mt-4 flex flex-col gap-6">
        {tips.culture && <Tip tip={tips.culture} type="Kultura" />}
        {tips.nature && <Tip tip={tips.nature} type="Příroda" />}
        {tips.food && <Tip tip={tips.food} type="Jídlo & pití" />}
      </div>
    </>
  ) : (
    <></>
  );
}

interface TipProps {
  tip: Tip;
  type: string;
}

function Tip({ tip, type }: TipProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white font-primary shadow dark:border-gray-700 dark:bg-gray-800">
      <Image
        className="max-h-40 w-full rounded-t-lg object-cover"
        src={tip.imageUrl}
        alt={`Fotka z místa "${tip.name}"`}
      />
      <div className="p-5">
        <p className="mb-1 text-lg font-semibold text-green-500">{type}</p>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {tip.name}
        </h5>
        {tip.comment && (
          <p className="mb-2 italic text-indigo-800">
            &bdquo;{tip.comment}&ldquo;
          </p>
        )}
        <LongText text={tip.description}></LongText>
        <SmallButtonLink href={tip.url}>
          Zobrazit na Mapy.cz{" "}
          <BoxArrowUpRight size={12} className="relative top-[-1px] ml-2" />
        </SmallButtonLink>
      </div>
    </div>
  );
}

const LongText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative mb-3">
      <p className="overflow-hidden font-normal text-gray-700">
        {expanded ? text : text.substring(0, 150)}{" "}
        {text.length > 150 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600"
          >
            {expanded ? "Zobrazit méně" : "Zobrazit více"}
          </button>
        )}
      </p>
    </div>
  );
};
