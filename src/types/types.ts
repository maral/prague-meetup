import { create } from "domain";
import { LatLngExpression } from "leaflet";
import { AreaTips } from "./tips";

export type GeoJSONData = GeoJSON.FeatureCollection;

export enum PolygonType {
  POLYGON = "Polygon",
  MULTIPOLYGON = "MultiPolygon",
}

export interface PolygonIdName {
  id: string;
  name: string;
}

export interface BasePolygon extends PolygonIdName {
  tips: AreaTips;
}

export interface SinglePolygonData extends BasePolygon {
  coordinates: LatLngExpression[];
  type: PolygonType.POLYGON;
}

export interface MultiPolygonData extends BasePolygon {
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

export type PolygonDataSortFunction = <Type extends PolygonIdName>(
  data: Type[]
) => Type[];

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
  Focused,
}

export interface PolygonOptionsMap {
  [id: string]: {
    color: PolygonColor;
    showName: boolean;
  };
}

export type PolygonNameMap = { [k: string]: string };
