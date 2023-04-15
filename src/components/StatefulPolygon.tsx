import { PolygonColor, PolygonData } from "@/types/types";
import { LeafletMouseEventHandlerFn, PathOptions, Polygon } from "leaflet";
import { useRef, useEffect } from "react";
import { Polygon as ReactPolygon, Tooltip, useMapEvents } from "react-leaflet";
import styles from "@/styles/StatefulPolygon.module.css";
import { Mukta } from "next/font/google";

const inter = Mukta({ weight: "400", subsets: ["latin"] });

interface PolygonWithStateProps {
  polygon: PolygonData;
  color: PolygonColor;
  showName: boolean;
  onClick?: LeafletMouseEventHandlerFn;
}

const colorStyles: { [key in PolygonColor]: [PathOptions, PathOptions] } = {
  [PolygonColor.Neutral]: [
    {
      fillColor: "blue",
      fillOpacity: 0.1,
    },
    {
      fillColor: "blue",
      fillOpacity: 0.15,
    },
  ],
  [PolygonColor.On]: [
    {
      fillColor: "#de3012",
      fillOpacity: 0.3,
    },
    {
      fillColor: "#de3012",
      fillOpacity: 0.38,
    },
  ],
  [PolygonColor.Correct]: [
    {
      fillColor: "#00ff00",
      fillOpacity: 0.3,
    },
    {
      fillColor: "#00ff00",
      fillOpacity: 0.5,
    },
  ],
  [PolygonColor.Wrong]: [
    {
      fillColor: "#ff0000",
      fillOpacity: 0.3,
    },
    {
      fillColor: "#ff0000",
      fillOpacity: 0.5,
    },
  ],
};

const StatefulPolygon: React.FC<PolygonWithStateProps> = ({
  polygon,
  color,
  showName,
  onClick,
}) => {
  const polygonRef = useRef<Polygon | null>(null);

  useEffect(() => {
    polygonRef.current?.setStyle(colorStyles[color][0]);
  }, [color, polygonRef]);

  const mouseover = () => {
    polygonRef.current?.setStyle(colorStyles[color][1]);
  };

  const mouseout = () => {
    polygonRef.current?.setStyle(colorStyles[color][0]);
  };

  return (
    <ReactPolygon
      ref={polygonRef}
      key={polygon.id}
      positions={polygon.coordinates}
      color="#555"
      weight={2}
      eventHandlers={{ click: onClick, mouseover, mouseout }}
    >
      {showName && (
        <Tooltip
          permanent={true}
          direction={"center"}
          className={`${styles.leafletTooltip} ${inter.className} bg-indigo-700 text-white`}
        >
          {polygon.name}
        </Tooltip>
      )}
    </ReactPolygon>
  );
};

export default StatefulPolygon;
