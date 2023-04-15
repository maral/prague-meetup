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
import { useEffect, useReducer } from "react";
import {
  PolygonActionType,
  getStoredState,
  idsArrayToState,
  municipalityPolygonReducer,
} from "@/state/coopState";
import CoopPanel from "@/components/coop/CoopPanel";

interface BlindMapProps {
  polygonData: PolygonData[];
}

export default function BlindMap({ polygonData }: BlindMapProps) {
  const [state, dispatch] = useReducer(
    municipalityPolygonReducer,
    idsArrayToState(
      polygonData.map((polygon) => polygon.id),
      () => false
    )
  );

  useEffect(() => {
    const storedState = getStoredState();
    if (storedState) {
      const ids = Object.entries(storedState)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);
      dispatch({ type: PolygonActionType.INITIALIZE, payload: { ids } });
    }
  }, []);

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => [
      polygon.id,
      {
        showName: true,
        color: state[polygon.id] ? PolygonColor.On : PolygonColor.Neutral,
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
          dispatch({ type: PolygonActionType.TOGGLE, payload: { ids: [id] } })}
        showPanel={true}
        panelTitle="Výběr s přáteli"
      >
        <CoopPanel data={polygonData} dispatch={dispatch} state={state} />
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return getPraguePolygonStaticProps(context);
};
