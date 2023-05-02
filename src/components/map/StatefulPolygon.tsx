import { PolygonColor, PolygonData } from "@/types/types";
import { LeafletMouseEventHandlerFn, PathOptions, Polygon } from "leaflet";
import { useRef, useEffect, useState } from "react";
import { Polygon as ReactPolygon, Tooltip } from "react-leaflet";
import styles from "@/styles/StatefulPolygon.module.css";
import { Mukta } from "next/font/google";

const inter = Mukta({ weight: "400", subsets: ["latin"] });

interface PolygonWithStateProps {
  polygon: PolygonData;
  color: PolygonColor;
  showName: boolean;
  onClick?: LeafletMouseEventHandlerFn;
}

const colors = {
  indigo: "#4338ca",
  lightRed: "#de3012",
  green: "#00ff00",
  red: "#ff0000",
  darkGray: "#555",
};

const colorStyles: { [key in PolygonColor]: [PathOptions, PathOptions] } = {
  [PolygonColor.Neutral]: [
    {
      fillColor: colors.indigo,
      fillOpacity: 0.1,
    },
    {
      fillColor: colors.indigo,
      fillOpacity: 0.15,
    },
  ],
  [PolygonColor.Focused]: [
    {
      fillColor: colors.indigo,
      color: colors.indigo,
      fillOpacity: 0,
      weight: 4,
    },
    {
      fillColor: colors.indigo,
      color: colors.indigo,
      fillOpacity: 0,
      weight: 4,
    },
  ],
  [PolygonColor.On]: [
    {
      fillColor: colors.lightRed,
      fillOpacity: 0.3,
    },
    {
      fillColor: colors.lightRed,
      fillOpacity: 0.38,
    },
  ],
  [PolygonColor.Correct]: [
    {
      fillColor: colors.green,
      fillOpacity: 0.3,
    },
    {
      fillColor: colors.green,
      fillOpacity: 0.5,
    },
  ],
  [PolygonColor.Wrong]: [
    {
      fillColor: colors.red,
      fillOpacity: 0.3,
    },
    {
      fillColor: colors.red,
      fillOpacity: 0.5,
    },
  ],
};

const defaultStyle: PathOptions = {
  color: colors.darkGray,
  weight: 2,
};

const StatefulPolygon: React.FC<PolygonWithStateProps> = ({
  polygon,
  color,
  showName,
  onClick,
}) => {
  const polygonRef = useRef<Polygon | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (polygonRef.current) {
      const currentStyle = colorStyles[color][hover ? 1 : 0];
      polygonRef.current.setStyle(currentStyle);
      for (const key in defaultStyle) {
        if (!(key in currentStyle)) {
          // @ts-ignore
          polygonRef.current.setStyle({ [key]: defaultStyle[key] });
        }
      }
      if (color === PolygonColor.Focused) {
        polygonRef.current?.bringToFront();
      }
    }
  }, [color, polygonRef, hover]);

  const mouseover = () => {
    setHover(true);
  };

  const mouseout = () => {
    setHover(false);
  };

  return (
    <ReactPolygon
      ref={polygonRef}
      key={polygon.id}
      positions={polygon.coordinates}
      color="#555"
      weight={2}
      eventHandlers={{
        ...(onClick ? { click: onClick } : {}),
        mouseover,
        mouseout,
      }}
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
