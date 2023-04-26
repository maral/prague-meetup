import Head from "next/head";
import { GetStaticProps } from "next";
import {
  MapStyle,
  PolygonColor,
  PolygonData,
  PolygonOptionsMap,
} from "@/types/types";
import { getPraguePolygonStaticProps } from "@/utils/loading";
import MapLayout from "@/components/MapLayout";
import Separator from "@/components/ui/Separator";
import GuessCorrect from "@/components/blind-map/GuessCorrect";
import GuessWrong from "@/components/blind-map/GuessWrong";
import GuessUnknown from "@/components/blind-map/GuessUnknown";
import { useMemo, useReducer } from "react";
import {
  BlindMapActionType,
  GameState,
  blindMapReducer,
} from "@/state/blindMapState";
import PanelTitle from "@/components/ui/PanelTitle";
import sampleSize from "lodash/sampleSize";
import { PanelButton } from "@/components/ui/PanelButton";

interface BlindMapProps {
  polygonData: PolygonData[];
}

export default function BlindMap({ polygonData }: BlindMapProps) {
  const [state, dispatch] = useReducer(blindMapReducer, {
    toGuessList: [],
    gameState: GameState.NotStarted,
    time: 0,
    guesses: [],
    current: 0,
  });

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => {
      const isCurrentGuess = state.guesses[state.current] === polygon.id;
      const isCurrentToGuess = state.toGuessList[state.current] === polygon.id;
      return [
        polygon.id,
        state.gameState === GameState.Paused
          ? {
              showName: isCurrentGuess || isCurrentToGuess,
              color: isCurrentToGuess
                ? PolygonColor.Correct
                : isCurrentGuess
                ? PolygonColor.Wrong
                : PolygonColor.Neutral,
            }
          : {
              showName: false,
              color: PolygonColor.Neutral,
            },
      ];
    })
  );

  const polygonNameMap = Object.fromEntries(
    polygonData.map((polygon) => [polygon.id, polygon.name])
  );

  const startGameFactory = (rounds: number) => () => {
    const toGuess = sampleSize(
      polygonData.map((polygon) => polygon.id),
      rounds
    );
    dispatch({ type: BlindMapActionType.START, payload: toGuess });
  };

  const currentPolygon = useMemo(() => {
    return [GameState.Started, GameState.Paused].includes(state.gameState)
      ? polygonData.find(
          (polygon) => polygon.id === state.toGuessList[state.current]
        )
      : undefined;
  }, [state.gameState, state.toGuessList, state.current, polygonData]);

  const polygonOnClickFactory = (id: string) => () => {
    if (state.gameState === GameState.Started) {
      dispatch({ type: BlindMapActionType.SELECT, payload: id });
      setTimeout(() => {
        if (state.current >= state.toGuessList.length - 1) {
          dispatch({ type: BlindMapActionType.FINISH });
        } else {
          dispatch({ type: BlindMapActionType.NEXT });
        }
      }, 1500);
    }
  };

  const correct = useMemo(() => {
    return state.guesses.reduce(
      (prev, current, index) =>
        prev + (current === state.toGuessList[index] ? 1 : 0),
      0
    );
  }, [state.toGuessList, state.guesses]);

  return (
    <>
      <Head>
        <title>Objevuj Prahu - Slepá mapa</title>
      </Head>
      <MapLayout
        polygonData={polygonData}
        polygonOptionsMap={polygonOptionsMap}
        mapStyle={MapStyle.Blind}
        onClickFactory={polygonOnClickFactory}
        showPanel={true}
        panelTitle="Slepá mapa"
      >
        {[GameState.Started, GameState.Paused].includes(state.gameState) && (
          <>
            <div className="text-gray-600">
              Úkol {state.current + 1} / {state.toGuessList.length}
            </div>
            <PanelTitle>
              Najdi na mapě MČ{" "}
              <span className="mx-0.5 inline-block rounded-md bg-indigo-700 px-2 font-bold text-white">
                {currentPolygon?.name}
              </span>
              .
            </PanelTitle>
            <div className="text-md font-primary text-lg">
              <Separator className="my-4" />
              <ul>
                {state.current < state.toGuessList.length && <GuessUnknown />}
                {state.guesses.map((_, index) => {
                  const reversedIndex = state.guesses.length - index - 1;
                  return state.guesses[reversedIndex] ===
                    state.toGuessList[reversedIndex] ? (
                    <GuessCorrect
                      key={index}
                      name={polygonNameMap[state.toGuessList[reversedIndex]]}
                    />
                  ) : (
                    <GuessWrong
                      key={index}
                      name={polygonNameMap[state.toGuessList[reversedIndex]]}
                    />
                  );
                })}
              </ul>
            </div>
          </>
        )}

        {state.gameState === GameState.NotStarted && (
          <>
            <PanelTitle>Vyberte délku hry</PanelTitle>

            <div className="grid grid-cols-1 gap-4">
              <PanelButton
                onClick={startGameFactory(10)}
                title="Krátká"
                subtitle="10 úkolů"
              />
              <PanelButton
                onClick={startGameFactory(25)}
                title="Střední"
                subtitle="25 úkolů"
              />
              <PanelButton
                onClick={startGameFactory(polygonData.length)}
                title="Celá Praha"
                subtitle="57 úkolů"
              />
            </div>
          </>
        )}

        {state.gameState === GameState.Finished && (
          <>
            <PanelTitle>Konec hry</PanelTitle>
            Gratulujeme! Zvládli jste umístit správně {correct} z{" "}
            {state.toGuessList.length} městských částí.
            <PanelButton
              title="Zahrát si znovu"
              subtitle=""
              onClick={() => dispatch({ type: BlindMapActionType.RESTART })}
            ></PanelButton>
          </>
        )}
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return getPraguePolygonStaticProps(context);
};
