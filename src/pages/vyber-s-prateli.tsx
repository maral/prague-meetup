import Head from "next/head";
import { GetStaticProps } from "next";
import { PolygonColor, PolygonData, PolygonOptionsMap } from "@/types/types";
import { getPraguePolygonStaticProps } from "@/utils/loading";
import MapLayout from "@/components/layout/MapLayout";
import { useEffect, useReducer } from "react";
import {
  CoopGameState,
  CoopActionType,
  getStoredState,
  idsArrayToSelection,
  municipalityPolygonReducer,
  getUncheckedCount,
} from "@/state/coopState";
import CoopPanel from "@/components/coop/CoopPanel";
import { MapStyle } from "@/utils/mapConstants";
import PanelH2 from "@/components/ui/PanelH2";
import { PanelButton } from "@/components/ui/PanelButton";

interface BlindMapProps {
  polygonData: PolygonData[];
}

export default function BlindMap({ polygonData }: BlindMapProps) {
  const [state, dispatch] = useReducer(municipalityPolygonReducer, {
    gameState: CoopGameState.Started,
    selection: idsArrayToSelection(
      polygonData.map((polygon) => polygon.id),
      () => false
    ),
  });

  useEffect(() => {
    const storedState = getStoredState();
    if (storedState) {
      const ids = Object.entries(storedState)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);
      dispatch({ type: CoopActionType.INITIALIZE, payload: { ids } });
    }
  }, []);

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => [
      polygon.id,
      {
        showName: true,
        color: state.selection[polygon.id]
          ? PolygonColor.On
          : PolygonColor.Neutral,
      },
    ])
  );

  return (
    <>
      <Head>
        <title>Výběr s přáteli</title>
      </Head>
      <MapLayout
        polygonData={polygonData}
        polygonOptionsMap={polygonOptionsMap}
        mapStyle={MapStyle.Normal}
        onClickFactory={(id) => () =>
          dispatch({ type: CoopActionType.TOGGLE, payload: { ids: [id] } })}
        showPanel={true}
        panelExpanded={false}
        focus="all"
        panelTitle="Výběr s přáteli"
      >
        {state.gameState === CoopGameState.Started && (
          <>
            <PanelH2>Vyber všechny již navštívené městské části</PanelH2>
            <p className="mb-6 italic text-gray-500">
              Již navštívené městské části jsou vyznačené červenou barvou. Z
              ostatních můžeme vybrat místo k objevení.
            </p>
            <PanelButton
              title="Mám hotovo"
              subtitle="Pokračovat dál"
              className="mb-6 w-full"
              onClick={() => dispatch({ type: CoopActionType.FINISH })}
            />
            <CoopPanel data={polygonData} dispatch={dispatch} state={state} />
          </>
        )}

        {state.gameState === CoopGameState.Finished && (
          <>
            <PanelH2>A je to!</PanelH2>

            <p className="mb-6">
              Máš {getUncheckedCount(state.selection)} městských částí, které
              zůstaly neoznačené. Teď si vyber, jak s nimi naložit.
            </p>

            <PanelH2>Pošleš to přátelům?</PanelH2>

            <p className="mb-6"></p>

            <PanelH2>Už to ukončíme?</PanelH2>

            <PanelButton
              title="Vyberu si sám"
              subtitle="Neponechám to náhodě"
              className="mb-6 w-full"
              onClick={() => dispatch({ type: CoopActionType.MANUALLY_SELECT })}
            />
            <PanelButton
              title="Vyberte za mě"
              subtitle="A ušetřete mě rozhodování"
              className="mb-6 w-full"
              onClick={() => dispatch({ type: CoopActionType.RANDOMLY_SELECT })}
            />
          </>
        )}
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return getPraguePolygonStaticProps(context);
};
