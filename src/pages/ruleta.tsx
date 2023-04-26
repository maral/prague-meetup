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
import { useCallback, useReducer } from "react";
import {
  RouletteActionType,
  RouletteGameState,
  rouletteReducer,
} from "@/state/rouletteState";
import { PanelButton } from "@/components/ui/PanelButton";
import sampleSize from "lodash/sampleSize";
import PanelTitle from "@/components/ui/PanelTitle";
import Tips from "@/components/Tips";
import SmallButtonLink from "@/components/ui/SmallButtonLink";
import { BoxArrowUpRight } from "react-bootstrap-icons";

interface RouletteProps {
  polygonData: PolygonData[];
}

const limit = 40;

export default function Roulette({ polygonData }: RouletteProps) {
  const [state, dispatch] = useReducer(rouletteReducer, {
    gameState: RouletteGameState.NotStarted,
    currentId: undefined,
  });

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => [
      polygon.id,
      {
        showName:
          state.gameState === RouletteGameState.Finished &&
          state.currentId === polygon.id,
        color:
          state.currentId === polygon.id
            ? state.gameState === RouletteGameState.Started
              ? PolygonColor.Wrong
              : PolygonColor.Correct
            : PolygonColor.Neutral,
      },
    ])
  );

  const currentPolygon = polygonData.find(
    (polygon) => polygon.id === state.currentId
  );

  const roll = useCallback(() => {
    dispatch({ type: RouletteActionType.START });
    const toGuess = sampleSize(
      polygonData.map((polygon) => polygon.id),
      limit
    );
    let i = 0;
    const run = () => {
      setTimeout(() => {
        dispatch({ type: RouletteActionType.NEXT, payload: toGuess[i++] });
        if (i < toGuess.length) {
          run();
        } else {
          dispatch({ type: RouletteActionType.FINISH });
        }
      }, i * 5 + (i > limit - 12 ? Math.pow(i - (limit - 12), 2) * 4 : 0));
    };
    run();
  }, [polygonData]);

  return (
    <>
      <Head>
        <title>Objevuj Prahu - Ruleta</title>
      </Head>
      <MapLayout
        polygonData={polygonData}
        polygonOptionsMap={polygonOptionsMap}
        mapStyle={MapStyle.Normal}
        showPanel={true}
        panelTitle="Ruleta"
      >
        {state.gameState === RouletteGameState.NotStarted && (
          <>
            <PanelTitle>Vítejte u naší rulety!</PanelTitle>
            <PanelButton
              onClick={roll}
              title="Spustit ruletu"
              className="w-full"
            />
          </>
        )}

        {state.gameState === RouletteGameState.Started && (
          <PanelTitle>{currentPolygon?.name}</PanelTitle>
        )}

        {state.gameState === RouletteGameState.Finished && currentPolygon && (
          <>
            <PanelTitle>Bingo, {currentPolygon.name}!</PanelTitle>
            <SmallButtonLink href={currentPolygon.tips.url}>
              {currentPolygon.name} na Mapy.cz{" "}
              <BoxArrowUpRight size={12} className="relative top-[-1px] ml-2" />
            </SmallButtonLink>
            <Tips tips={currentPolygon.tips}></Tips>
            <PanelButton
              onClick={() => dispatch({ type: RouletteActionType.RESTART })}
              title="Zkusíš to znovu?"
              className="mt-6 w-full"
            />
          </>
        )}
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props = getPraguePolygonStaticProps(context);
  return props;
};
