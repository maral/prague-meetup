import { create } from "domain";
import { LatLngExpression } from "leaflet";

export type GeoJSONData = GeoJSON.FeatureCollection;

export enum PolygonType {
  POLYGON = "Polygon",
  MULTIPOLYGON = "MultiPolygon",
}

export interface PolygonIdName {
  id: string;
  name: string;
}

export interface SinglePolygonData extends PolygonIdName {
  coordinates: LatLngExpression[];
  type: PolygonType.POLYGON;
}

export interface MultiPolygonData extends PolygonIdName {
  coordinates: LatLngExpression[][];
  type: PolygonType.MULTIPOLYGON;
}

export type PolygonData = SinglePolygonData | MultiPolygonData;

export const isSinglePolygonData = (
  value: PolygonData
): value is SinglePolygonData => value.type === PolygonType.POLYGON;

export const isMultiPolygonData = (
  value: PolygonData
): value is MultiPolygonData => value.type === PolygonType.MULTIPOLYGON;

export type PolygonDataSortFunction = (data: PolygonData[]) => PolygonData[];

export interface PolygonPropertiesMap {
  idKey: string;
  nameKey: string;
}

export enum SortFunctionType {
  PRAGUE_DISTRICTS = "pragueDistricts",
  NAME_SORT = "nameSort",
}

export const enum PolygonColor {
  Neutral,
  On,
  Correct,
  Wrong,
}

export interface PolygonOptionsMap {
  [id: string]: {
    color: PolygonColor;
    showName: boolean;
  };
}

export enum MapStyle {
  Normal = "normal",
  Blind = "empty",
}

const accessToken =
  "pk.eyJ1IjoibWFyZWtsaXN5IiwiYSI6ImNsZzhicW81ejB3N3AzaXBkaHN3ZmlxNGMifQ.2coMyxXBY8l3wt5i4dNb8A";
const user = "mareklisy";
const createMapBoxUrl = (styleId: string) =>
  `https://api.mapbox.com/styles/v1/${user}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;
export const mapboxTilesUrls = {
  [MapStyle.Normal]: createMapBoxUrl("clg8bw6d6002k01mgboi4vz0w"),
  [MapStyle.Blind]: createMapBoxUrl("clgb26rpx003701n2fdjr0yb9"),
};
