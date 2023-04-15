import { GeoJSONData } from "@/components/Map";
import {
  PolygonData,
  PolygonDataSortFunction,
  PolygonIdName,
  PolygonPropertiesMap,
  PolygonType,
  SortFunctionType,
} from "@/types/types";
import { LatLngExpression } from "leaflet";

export function geoJsonToPolygonData(
  geoJsonData: GeoJSONData,
  propertiesMap: PolygonPropertiesMap,
  sortFunction: PolygonDataSortFunction | null
): PolygonData[] {
  const transformed = geoJsonData.features
    .map((feature) => {
      const properties = propertiesToIdName(feature.properties, propertiesMap);
      if (properties === null) {
        return null;
      }
      if (
        ![
          PolygonType.POLYGON.toString(),
          PolygonType.MULTIPOLYGON.toString(),
        ].includes(feature.geometry.type)
      ) {
        return null;
      }
      const type = feature.geometry.type as PolygonType;
      return {
        ...properties,
        type,
        coordinates:
          type === PolygonType.POLYGON
            ? convertPolygonCoordinates(feature.geometry as GeoJSON.Polygon)
            : convertMultiPolygonCoordinates(
                feature.geometry as GeoJSON.MultiPolygon
              ),
      };
    })
    .filter((data): data is PolygonData => data !== null);
  return sortFunction ? sortFunction(transformed) : transformed;
}

function convertPolygonCoordinates(
  geometry: GeoJSON.Polygon
): LatLngExpression[] {
  return geometry.coordinates[0].map((coord) => [coord[1], coord[0]]);
}

function convertMultiPolygonCoordinates(
  geometry: GeoJSON.MultiPolygon
): LatLngExpression[][] {
  return geometry.coordinates.map((coordArray) =>
    coordArray[0].map((coord) => [coord[1], coord[0]])
  );
}

function propertiesToIdName(
  properties: GeoJSON.GeoJsonProperties,
  propertiesMap: PolygonPropertiesMap
): PolygonIdName | null {
  if (
    !properties ||
    !properties[propertiesMap.idKey] ||
    !properties[propertiesMap.nameKey]
  ) {
    return null;
  }
  return {
    id: properties[propertiesMap.idKey],
    name: replace(properties[propertiesMap.nameKey]),
  };
}

function replace(name: string) {
  return name
    .replace(/(národní )?přírodní památka/g, "")
    .replace(/přírodní rezervace/g, "")
    .trim();
}

const pragueNumberPattern = /^Praha (\d+)$/;
export const sortPragueDistricts = (data: PolygonData[]): PolygonData[] => {
  return data.sort((a, b) => {
    const aPrague = pragueNumberPattern.test(a.name);
    const bPrague = pragueNumberPattern.test(b.name);
    if (!aPrague && !bPrague) return a.name.localeCompare(b.name);
    if (aPrague && !bPrague) return -1;
    if (!aPrague && bPrague) return 1;
    const numA = pragueNumberPattern.exec(a.name);
    const numB = pragueNumberPattern.exec(b.name);
    if (numA === null || numB === null) return 0;
    return parseInt(numA[1]) - parseInt(numB[1]);
  });
};

export const sortFunctionsMap: {
  [key: string]: PolygonDataSortFunction;
} = {
  [SortFunctionType.PRAGUE_DISTRICTS.toString()]: sortPragueDistricts,
  [SortFunctionType.NAME_SORT.toString()]: (data) =>
    data.sort((a, b) => a.name.localeCompare(b.name)),
};
