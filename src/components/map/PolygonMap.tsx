import { useEffect, useRef, useState } from "react";
import {
  LayerGroup,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L, { LeafletMouseEventHandlerFn, canvas, latLngBounds } from "leaflet";
import StatefulPolygon from "@/components/map/StatefulPolygon";
import {
  PolygonColor,
  PolygonData,
  isSinglePolygonData,
  PolygonOptionsMap,
} from "@/types/types";
import { MapStyle, mapSources } from "@/utils/mapConstants";
import { usePrevious } from "@/utils/hooks";
import { AreaTips } from "@/types/tips";
import { cultureIcon, foodIcon, natureIcon } from "@/utils/markerIcons";

interface MapProps {
  polygonData: PolygonData[];
  onClickFactory?: (id: string) => LeafletMouseEventHandlerFn;
  polygonOptionsMap: PolygonOptionsMap;
  mapStyle: MapStyle;
  panelExpanded: boolean;
  tips?: AreaTips;
  focus?: string;
}

const PolygonMap = ({
  polygonData,
  polygonOptionsMap,
  onClickFactory,
  mapStyle,
  panelExpanded,
  tips,
  focus,
}: MapProps) => {
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const renderer = canvas();

  return (
    <MapContainer
      className="h-full w-full"
      center={[50.059894, 14.465561]}
      zoom={12}
      zoomSnap={0.5}
      doubleClickZoom={false}
      renderer={renderer}
    >
      <TileLayer {...mapSources[mapStyle]} />
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

      {tips && (
        <LayerGroup>
          {tips.culture && (
            <Marker position={tips.culture.gps} icon={cultureIcon}>
              <Tooltip direction="bottom">{tips.culture.name}</Tooltip>
            </Marker>
          )}
          {tips.nature && (
            <Marker position={tips.nature.gps} icon={natureIcon}>
              <Tooltip direction="bottom">{tips.nature.name}</Tooltip>
            </Marker>
          )}
          {tips.food && (
            <Marker position={tips.food.gps} icon={foodIcon}>
              <Tooltip direction="bottom">{tips.food.name}</Tooltip>
            </Marker>
          )}
        </LayerGroup>
      )}

      <CenterComponent
        polygonData={polygonData}
        mapStyle={mapStyle}
        panelExpanded={panelExpanded}
        focus={focus}
      />
    </MapContainer>
  );
};

interface CenterComponentProps {
  polygonData: PolygonData[];
  mapStyle: MapStyle;
  panelExpanded: boolean;
  focus?: string;
}

let doNotFocusAfterResize = false;

const CenterComponent = ({
  polygonData,
  mapStyle,
  panelExpanded,
  focus,
}: CenterComponentProps) => {
  const prevPanelExpanded = usePrevious(panelExpanded);

  const map = useMap();
  useEffect(() => {
    if (panelExpanded === prevPanelExpanded) {
      focusMap(map, polygonData, focus);
    } else {
      doNotFocusAfterResize = true;
      invalidateAndFocus(
        map,
        polygonData,
        focus,
        focus && focus !== "all" ? 1500 : 300
      );
    }
  }, [polygonData, map, focus, panelExpanded, prevPanelExpanded]);

  useEffect(() => {
    map.addLayer(
      L.tileLayer(mapSources[mapStyle].url, {
        attribution: mapSources[mapStyle].attribution,
      })
    );
  }, [map, mapStyle]);

  useMapEvents({
    resize() {
      if (doNotFocusAfterResize) {
        doNotFocusAfterResize = false;
      } else {
        invalidateAndFocus(map, polygonData, focus);
      }
    },
  });

  return null;
};

const invalidateAndFocus = (
  map: L.Map,
  polygonData: PolygonData[],
  focus?: string,
  delay = 300
) => {
  setTimeout(() => {
    map.invalidateSize();
    setTimeout(() => {
      focusMap(map, polygonData, focus);
    }, delay);
  }, 300);
};

const focusMap = (map: L.Map, polygonData: PolygonData[], focus?: string) => {
  if (polygonData.length > 0) {
    if (focus === "all") {
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
    } else {
      const polygon = polygonData.find((p) => p.id === focus);
      if (polygon) {
        map.fitBounds(
          latLngBounds(
            isSinglePolygonData(polygon)
              ? polygon.coordinates
              : polygon.coordinates.flatMap((coordinates) => coordinates)
          )
        );
      }
    }
  }
};

export default PolygonMap;
