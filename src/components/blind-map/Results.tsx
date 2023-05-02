import { PolygonNameMap } from "@/types/types";
import { countCorrect } from "@/utils/data";
import { useState } from "react";
import { Check, Bullseye, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import LinkButton from "../ui/LinkButton";
import PanelH2 from "../ui/PanelH2";
import Separator from "../ui/Separator";
import Guesses from "./Guesses";
import SlideDown from "../ui/SlideDown";

interface ResultsProps {
  polygonNameMap: PolygonNameMap;
  toGuessList: string[];
  guesses: string[];
}

export default function Results({
  polygonNameMap,
  toGuessList,
  guesses,
}: ResultsProps) {
  const correct = countCorrect(toGuessList, guesses);
  const percentage = Math.round((correct / toGuessList.length) * 100);

  return (
    <>
      <div className="mb-4">
        <PanelH2>Výsledky</PanelH2>
        <div className="mb-6 flex w-full justify-evenly text-gray-900">
          <p className="flex-1 whitespace-nowrap pr-4 font-secondary">
            <span className="inline-block rounded-xl bg-green-600">
              <Check size={24} color="white" />{" "}
            </span>
            <span className="ml-2 text-5xl">
              {countCorrect(toGuessList, guesses)}
            </span>
            <span className="mx-1.5 self-end text-3xl text-gray-400">/</span>
            <span className="text-3xl text-gray-500">
              {toGuessList.length}{" "}
            </span>
          </p>
          <p className="flex-1 self-end font-secondary">
            <span className="inline-block text-2xl text-rose-500">
              <Bullseye />
            </span>
            <span className="mx-2 text-5xl">{percentage}</span>
            <span className="text-3xl text-gray-500">%</span>
          </p>
        </div>
        <SlideDown
          hideText="Skrýt podrobné výsledky"
          showText="Zobrazit podrobné výsledky"
        >
          <Guesses
            toGuessList={toGuessList}
            guesses={guesses}
            showPlaceholder={false}
            polygonNameMap={polygonNameMap}
          />
        </SlideDown>
      </div>
      <Separator className="mb-4" />
    </>
  );
}
