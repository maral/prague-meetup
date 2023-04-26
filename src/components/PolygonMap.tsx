import { useEffect, useRef } from "react";
import {
  LayerGroup,
  MapContainer,
  PolygonProps,
  TileLayer,
  useMap,
} from "react-leaflet";
import L, {
  LeafletMouseEventHandlerFn,
  canvas,
  latLngBounds,
  tileLayer,
} from "leaflet";
import StatefulPolygon from "./StatefulPolygon";
import {
  PolygonColor,
  PolygonData,
  isSinglePolygonData,
  PolygonOptionsMap,
  MapStyle,
  mapboxTilesUrls,
} from "@/types/types";

interface MapProps {
  polygonData: PolygonData[];
  onClickFactory?: (id: string) => LeafletMouseEventHandlerFn;
  polygonOptionsMap: PolygonOptionsMap;
  mapStyle: MapStyle;
}

const PolygonMap = ({
  polygonData,
  polygonOptionsMap,
  onClickFactory,
  mapStyle,
}: MapProps) => {
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const renderer = canvas();

  return (
    <MapContainer
      className="h-full w-full"
      center={[50.08804, 14.42076]}
      zoom={13}
      zoomSnap={0.5}
      doubleClickZoom={false}
      renderer={renderer}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        attribution='&copy; <a href="https://www.mapbox.com">Mapbox</a>'
        url={mapboxTilesUrls[mapStyle]}
      />
      <LayerGroup ref={layerGroupRef}>
        {polygonData.map((polygon) => (
          <StatefulPolygon
            polygon={polygon}
            key={polygon.id}
            showName={
              polygonOptionsMap[polygon.id]
                ? polygonOptionsMap[polygon.id].showName
                : true
            }
            onClick={onClickFactory ? onClickFactory(polygon.id) : undefined}
            color={
              polygonOptionsMap[polygon.id]
                ? polygonOptionsMap[polygon.id].color
                : PolygonColor.Neutral
            }
          ></StatefulPolygon>
        ))}
      </LayerGroup>

      <CenterComponent polygonData={polygonData} />
    </MapContainer>
  );
};

interface CenterComponentProps {
  polygonData: PolygonData[];
}

const CenterComponent = ({ polygonData }: CenterComponentProps) => {
  const map = useMap();
  useEffect(() => {
    if (polygonData.length > 0) {
      map.fitBounds(
        latLngBounds(
          polygonData.flatMap((polygon) => {
            if (isSinglePolygonData(polygon)) {
              return polygon.coordinates;
            } else {
              return polygon.coordinates.flat();
            }
          })
        )
      );
    }
  }, [polygonData, map]);

  return null;
};

export default PolygonMap;
