import dynamic from "next/dynamic";
import Panel from "@/components/layout/Panel";
import { PolygonData, PolygonOptionsMap } from "@/types/types";
import { LeafletMouseEventHandlerFn } from "leaflet";
import { RefObject, useState } from "react";
import { MapStyle } from "@/utils/mapConstants";
import { AreaTips } from "@/types/tips";

interface MapLayoutProps {
  polygonData: PolygonData[];
  polygonOptionsMap: PolygonOptionsMap;
  mapStyle: MapStyle;
  onClickFactory?: (id: string) => LeafletMouseEventHandlerFn;
  showPanel: boolean;
  panelExpanded: boolean;
  panelTitle: string;
  panelRef?: RefObject<HTMLDivElement>;
  tips?: AreaTips;
  focus?: string;
  children?: React.ReactNode;
}

const DynamicMap = dynamic(() => import("../map/PolygonMap"), {
  ssr: false,
});

export default function MapLayout({
  polygonData,
  polygonOptionsMap,
  mapStyle,
  onClickFactory,
  showPanel,
  panelExpanded,
  panelTitle,
  panelRef,
  tips,
  focus,
  children,
}: MapLayoutProps) {
  // const [panelExpanded, setExpanded] = useState(false);

  const mapWidthWithPanel = panelExpanded
    ? "lg:w-[calc(100vh-40rem)"
    : "lg:w-[calc(100vh-36rem)";
  const panelWidth = panelExpanded ? "lg:w-[48rem]" : "lg:w-[36rem]";
  const mapHeight = panelExpanded ? "h-[40vh]" : "h-[70vh]";
  const panelHeight = panelExpanded ? "h-[70vh]" : "h-[40vh]";

  return (
    <main className="flex h-screen flex-col lg:flex-row">
      <div
        className={`relative ${mapHeight} w-full lg:h-full ${
          showPanel ? mapWidthWithPanel : ""
        }`}
      >
        <DynamicMap
          polygonData={polygonData}
          onClickFactory={onClickFactory}
          polygonOptionsMap={polygonOptionsMap}
          mapStyle={mapStyle}
          panelExpanded={panelExpanded}
          focus={focus}
          tips={tips}
        ></DynamicMap>
      </div>
      {showPanel && (
        <div
          className={`relative z-1000 ${panelHeight} w-full shadow-info-box transition-all lg:h-full ${panelWidth}`}
        >
          <Panel title={panelTitle} expanded={true} divRef={panelRef}>
            {children}
          </Panel>
        </div>
      )}

      {/* <button
        className="bold fixed bottom-0 right-0 z-1000 m-4 w-32 rounded-md bg-red-600 p-4 font-primary text-white transition-all hover:bg-red-500"
        onClick={() => setExpanded(!panelExpanded)}
      >
        {panelExpanded ? "Sbalit" : "Rozbalit"}
      </button> */}
    </main>
  );
}
