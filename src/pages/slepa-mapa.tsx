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
import { ArrowRight, X } from "react-bootstrap-icons";

interface BlindMapProps {
  polygonData: PolygonData[];
}

export default function BlindMap({ polygonData }: BlindMapProps) {
  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => [
      polygon.id,
      {
        showName: false,
        color: PolygonColor.Neutral,
      },
    ])
  );

  return (
    <>
      <Head>
        <title>Slepá mapa</title>
      </Head>
      <Head>
        <title>Výběr s přáteli</title>
      </Head>
      <MapLayout
        polygonData={polygonData}
        polygonOptionsMap={polygonOptionsMap}
        mapStyle={MapStyle.Blind}
        onClickFactory={undefined}
        showPanel={true}
        panelTitle="Slepá mapa"
      >
        <div className="mb-4 font-lead text-xl text-indigo-700 lg:mb-8 lg:text-lg">
          Úkol 1 z 15
        </div>
        <div className="text-md font-primary text-lg">
          Najdi na mapě MČ{" "}
          <span className="mx-1 inline-block rounded-md bg-indigo-700 px-2 font-bold text-white">
            Praha 1
          </span>
          <Separator className="my-4" />
          <ul>
            <li className="flex items-center gap-2 space-x-2">
              <span className="rounded">
                <X />
              </span>{" "}
              Lochkov
            </li>
          </ul>
        </div>
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return getPraguePolygonStaticProps(context);
};
