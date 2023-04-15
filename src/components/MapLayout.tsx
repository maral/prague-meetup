import dynamic from "next/dynamic";
import Panel from "./Panel";
import { MapStyle, PolygonData, PolygonOptionsMap } from "@/types/types";
import { LeafletMouseEventHandlerFn } from "leaflet";

interface MapLayoutProps {
  polygonData: PolygonData[];
  polygonOptionsMap: PolygonOptionsMap;
  mapStyle: MapStyle;
  onClickFactory?: (id: string) => LeafletMouseEventHandlerFn;
  showPanel: boolean;
  panelTitle: string;
  children?: React.ReactNode;
}

const DynamicMap = dynamic(() => import("./PolygonMap"), {
  ssr: false,
});

export default function MapLayout({
  polygonData,
  polygonOptionsMap,
  mapStyle,
  onClickFactory,
  showPanel,
  panelTitle,
  children,
}: MapLayoutProps) {
  return (
    <main className="flex h-screen flex-col lg:flex-row">
      <div className={`relative h-full w-full ${showPanel ? "lg:w-3/4" : ""}`}>
        <DynamicMap
          polygonData={polygonData}
          onClickFactory={onClickFactory}
          polygonOptionsMap={polygonOptionsMap}
          mapStyle={mapStyle}
        ></DynamicMap>
      </div>
      {showPanel && (
        <div className="relative z-1000 h-[40vh] w-full shadow-info-box lg:h-full lg:w-1/4">
          <Panel title={panelTitle}>{children}</Panel>
        </div>
      )}
    </main>
  );
}
