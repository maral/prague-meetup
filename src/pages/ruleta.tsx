import Head from "next/head";
import { GetStaticProps } from "next";
import { PolygonColor, PolygonData, PolygonOptionsMap } from "@/types/types";
import { getPraguePolygonStaticProps } from "@/utils/loading";
import MapLayout from "@/components/layout/MapLayout";
import { useCallback, useReducer } from "react";
import {
  RouletteActionType,
  RouletteGameState,
  rouletteReducer,
} from "@/state/rouletteState";
import { PanelButton } from "@/components/ui/PanelButton";
import sampleSize from "lodash/sampleSize";
import PanelH2 from "@/components/ui/PanelH2";
import Tips from "@/components/common/Tips";
import { MapStyle } from "@/utils/mapConstants";

interface RouletteProps {
  polygonData: PolygonData[];
}

const limit = 40;
const forceCustomId = undefined;

export default function Roulette({ polygonData }: RouletteProps) {
  const [state, dispatch] = useReducer(rouletteReducer, {
    gameState: forceCustomId
      ? RouletteGameState.Finished
      : RouletteGameState.NotStarted,
    currentId: forceCustomId,
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
              : PolygonColor.Focused
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
        panelExpanded={state.gameState === RouletteGameState.Finished}
        panelTitle="Ruleta"
        focus={
          state.gameState === RouletteGameState.Finished && currentPolygon
            ? currentPolygon.id
            : "all"
        }
        tips={
          state.gameState === RouletteGameState.Finished && currentPolygon
            ? currentPolygon.tips
            : undefined
        }
      >
        {state.gameState === RouletteGameState.NotStarted && (
          <>
            <PanelH2>Vítej u naší rulety!</PanelH2>
            <PanelButton
              onClick={roll}
              title="Spustit ruletu"
              className="w-full"
            />
          </>
        )}

        {state.gameState === RouletteGameState.Started && (
          <PanelH2>{currentPolygon?.name}</PanelH2>
        )}

        {state.gameState === RouletteGameState.Finished && currentPolygon && (
          <>
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
