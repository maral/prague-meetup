import { PolygonNameMap } from "@/types/types";
import GuessCorrect from "./GuessCorrect";
import GuessWrong from "./GuessWrong";
import GuessUnknown from "./GuessUnknown";

interface GuessesProps {
  polygonNameMap: PolygonNameMap;
  toGuessList: string[];
  guesses: string[];
  showPlaceholder: boolean;
}

export default function Guesses({
  polygonNameMap,
  toGuessList,
  guesses,
  showPlaceholder,
}: GuessesProps) {
  return (
    <ul>
      {showPlaceholder && <GuessUnknown />}
      {guesses.map((_, index) => {
        return guesses[index] === toGuessList[index] ? (
          <GuessCorrect key={index} name={polygonNameMap[toGuessList[index]]} />
        ) : (
          <GuessWrong
            wrong={polygonNameMap[guesses[index]]}
            correct={polygonNameMap[toGuessList[index]]}
          />
        );
      })}
    </ul>
  );
}
