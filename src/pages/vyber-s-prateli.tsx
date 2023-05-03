import Head from "next/head";
import { GetStaticProps } from "next";
import { PolygonColor, PolygonData, PolygonOptionsMap } from "@/types/types";
import { getPraguePolygonStaticProps } from "@/utils/loading";
import MapLayout from "@/components/layout/MapLayout";
import { useEffect, useReducer, useRef } from "react";
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
import Pill from "@/components/ui/Pill";
import CopyUrl from "@/components/coop/CopyUrl";
import PanelH1 from "@/components/ui/PanelH1";
import SelectingMunicipality from "@/components/common/SelectingMunicipality";
import { InfoCircleFill } from "react-bootstrap-icons";
import { TipReason } from "@/types/tips";
import Tips from "@/components/common/Tips";
import { decodeUrlParameterToSelection, encodeSelectionToUrlParameter, getSelectionParameter, selectionParameterName } from "@/utils/url";
import { useRouter } from "next/router";

const urlPath = "vyber-s-prateli";

interface BlindMapProps {
  polygonData: PolygonData[];
  siteUrl: string;
}

export default function BlindMap({ polygonData, siteUrl }: BlindMapProps) {
  const [state, dispatch] = useReducer(municipalityPolygonReducer, {
    gameState: CoopGameState.Started,
    selection: idsArrayToSelection(
      polygonData.map((polygon) => polygon.id),
      () => false
    ),
  });

  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (router.isReady) {
      const selectionParam = getSelectionParameter(router);
      const selection = selectionParam
        ? decodeUrlParameterToSelection(polygonData, selectionParam)
        : getStoredState();
      if (selection) {
        const ids = Object.entries(selection)
          .filter(([_, value]) => value)
          .map(([key, _]) => key);
        dispatch({ type: CoopActionType.INITIALIZE, payload: { ids } });
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [state.gameState, panelRef])

  const selectedPolygon = state.tipId
  ? polygonData.find((polygon) => polygon.id === state.tipId)
  : undefined;

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => [
      polygon.id,
      state.gameState === CoopGameState.ShowTips &&
        selectedPolygon &&
            selectedPolygon.id === polygon.id
          ? { showName: true, color: PolygonColor.Focused }
          :
      {
        showName: true,
        color: state.selection[polygon.id]
          ? PolygonColor.On
          : PolygonColor.Neutral,
      },
    ])
  );

  const uncheckedCount = getUncheckedCount(state.selection);
  const shareUrl = state.gameState === CoopGameState.Finished
    ? `${siteUrl}/${urlPath}?${selectionParameterName}=${encodeSelectionToUrlParameter(polygonData, state.selection)}`
    : null;

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
        focus={state.gameState === CoopGameState.ShowTips && selectedPolygon
          ? selectedPolygon.id
          : "all"}
        panelTitle="Výběr s přáteli"
        panelRef={panelRef}
        tips={selectedPolygon && selectedPolygon.tips}
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
              subtitle={uncheckedCount === 0 ? "Nezbývá žádná MČ" : "Pokračovat dál"}
              className="mb-6 w-full"
              onClick={() => dispatch({ type: CoopActionType.FINISH })}
              disabled={uncheckedCount === 0}
            />
            <CoopPanel data={polygonData} dispatch={dispatch} state={state} />
          </>
        )}

        {state.gameState === CoopGameState.Finished && (
          <>
            <PanelH1>A je to!</PanelH1>

            <p className="mb-6">
              Máš{" "}
              <Pill className="pr-1 pl-1 pt-0.5 pb-0.5">
                {getUncheckedCount(state.selection)}
              </Pill>{" "}
              {getUncheckedCount(state.selection) < 5 ? "městské části" : "městských částí"}, které zůstaly neoznačené. Teď si vyber, jak s
              nimi naložit.
            </p>

            <PanelH2>Pošleš to přátelům?</PanelH2>

            <p className="mb-2">
              Pošli svůj výběr jako odkaz. Další člověk může tvůj výběr rozšířit
              a buď poslat ještě dál, nebo vybrat lokalitu pro vaši společnou
              výpravu.
            </p>

            <CopyUrl className="mb-8" url={`${shareUrl}`} />

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

        {state.gameState === CoopGameState.SelectingMunicipality && (
          <SelectingMunicipality
            onMunicipalitySelect={
              (id) => dispatch({ type: CoopActionType.SELECT_MUNICIPALITY, payload: id })
            }
            polygons={polygonData.filter((polygon) => !state.selection[polygon.id])}
          />
        )}

        {state.gameState === CoopGameState.ShowTips && (
          <>
            <p className="mb-6 flex items-start gap-1 italic text-gray-600 ">
              <InfoCircleFill size={14} className="mr-1 mt-1 inline" />
              <span>
                {state.reason === TipReason.OnlyOption &&
                  "Tvoje jediná chyba je tvým osudem."}
                {state.reason === TipReason.RandomlySelected &&
                  "Vybrali jsme za tebe náhodně jednu z nenavštívených městských částí."}
                {state.reason === TipReason.UserSelected &&
                  "Byla to tvoje volba."}
              </span>
            </p>
            {selectedPolygon && <Tips tips={selectedPolygon.tips} />}
            <PanelButton
              className="mt-6 w-full"
              title="Zkusím to úplně odznovu"
              subtitle="Vymaže se předchozí výběr"
              onClick={() => dispatch({ type: CoopActionType.RESTART_CLEAN })}
            />

            <PanelButton
              className="mt-6 w-full"
              title="Vyberu si jinak"
              subtitle="S tím, co bylo vybráno"
              onClick={() => dispatch({ type: CoopActionType.RESTART_PREVIOUS })}
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
