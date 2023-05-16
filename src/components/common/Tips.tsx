import { AreaTips, Tip, TipType } from "@/types/tips";
import { useEffect, useState } from "react";
import SmallButtonLink from "../ui/SmallButtonLink";
import {
  BoxArrowUpRight,
  BuildingsFill,
  CupHotFill,
  HeartFill,
  TreeFill,
} from "react-bootstrap-icons";
import Image from "next/image";
import PanelH2 from "../ui/PanelH2";
import sample from "lodash/sample";
import Link from "next/link";
import LinkButton from "../ui/LinkButton";
import Pill from "../ui/Pill";
import PanelH1 from "../ui/PanelH1";
import SlideDown from "../ui/SlideDown";
import ExternalLink from "../ui/ExternalLink";

interface TipsProps {
  tips: AreaTips;
}

const titles: ((name: string) => JSX.Element)[] = [
  (name) => (
    <>
      Bingo, <Pill>{name}</Pill>!
    </>
  ),
  (name) => (
    <>
      A je to tu: <Pill>{name}</Pill>!
    </>
  ),
  (name) => (
    <>
      Tvůj úděl, <Pill>{name}</Pill>!
    </>
  ),
  (name) => (
    <>
      Příští zastávka <Pill>{name}</Pill>!
    </>
  ),
  (name) => (
    <>
      Voilà, <Pill>{name}</Pill>!
    </>
  ),
  (name) => (
    <>
      <Pill>{name}</Pill> už se těší!
    </>
  ),
  (name) => (
    <>
      <Pill>{name}</Pill>, co ty na to?
    </>
  ),
  (name) => (
    <>
      <Pill>{name}</Pill>, a basta!
    </>
  ),
];

const useTitle = (tips: AreaTips) => {
  const [title, setTitle] = useState(<>Něco se nepovedlo</>);
  useEffect(() => {
    const titleFunction = sample(titles);
    setTitle(titleFunction ? titleFunction(tips.name) : <>Něco se nepovedlo</>);
  }, [tips]);
  return title;
};

export default function Tips({ tips }: TipsProps) {
  const title = useTitle(tips);

  return (
    <>
      <PanelH1>{title}</PanelH1>
      {tips.description && (
        <p className="mb-4">{tips.description}</p>
      )}
      <SmallButtonLink href={tips.url} className="mb-12">
        {tips.name} k prozkoumání na Mapy.cz{" "}
        <BoxArrowUpRight size={12} className="relative top-[-1px] ml-2" />
      </SmallButtonLink>
      {tips.culture || tips.nature || tips.food ? (
        <>
          <PanelH2>Kam zamířit</PanelH2>
          <div className="mt-4 flex flex-col gap-6">
            {tips.culture && <Tip tip={tips.culture} type="culture" />}
            {tips.nature && <Tip tip={tips.nature} type="nature" />}
            {tips.food && <Tip tip={tips.food} type="food" />}
          </div>
        </>
      ) : (
        <>
          <PanelH2>Máme takový drobný problém...</PanelH2>
          <p>
            Bohužel pro tuto městskou část zatím nemáme žádné tipy. Pokud jsi
            dobrá duše a chceš pomoct, můžeš vložit chybějící tipy{" "}
            <ExternalLink
              href="https://forms.gle/oPZUQg4vNBofSPpE7"
            >
              přes tento formulář
            </ExternalLink>
            . Díky moc. <HeartFill className="inline text-sm text-red-600" />
          </p>
        </>
      )}
    </>
  );
}

interface TipProps {
  tip: Tip;
  type: TipType;
}

const getTipTypeName = (type: TipType): string => {
  switch (type) {
    case "culture":
      return "Kultura";
    case "nature":
      return "Příroda";
    case "food":
      return "Jídlo & pití";
  }
};

const getTipIcon = (type: TipType): JSX.Element => {
  switch (type) {
    case "culture":
      return (
        <BuildingsFill size={20} className="relative top-[-3px] mr-2 inline" />
      );
    case "nature":
      return <TreeFill className="relative top-[-2px] mr-2 inline" />;
    case "food":
      return <CupHotFill className="relative top-[-3px] mr-2 inline" />;
  }
};

function Tip({ tip, type }: TipProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white font-primary shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <Image
        className="max-h-40 w-full rounded-t-lg object-cover"
        src={tip.imageUrl}
        alt={`Fotka z místa "${tip.name}"`}
        width={800}
        height={600}
        unoptimized={tip.imageUrl.includes("panorama")}
      />
      <div className="p-5">
        <p className="mb-1 text-lg font-semibold text-green-500">
          {getTipIcon(type)}
          {getTipTypeName(type)}
        </p>
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
          <LinkButton onClick={() => setExpanded(!expanded)}>
            {expanded ? "Zobrazit méně" : "Zobrazit více"}
          </LinkButton>
        )}
      </p>
    </div>
  );
};
