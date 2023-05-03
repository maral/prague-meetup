import { CoopSelection } from "@/state/coopState";
import { decodeBooleans, encodeBooleans } from "./boolArrayCodec";
import { PolygonData } from "@/types/types";
import { sortPragueDistricts } from "./data";
import { NextRouter } from "next/router";

export const selectionParameterName = "s";

export const encodeSelectionToUrlParameter = (data: PolygonData[], selection: CoopSelection): string => {
  const sorted = sortPragueDistricts(data);
  return encodeBooleans(sorted.map((polygon) => selection[polygon.id]));
};

export const decodeUrlParameterToSelection = (data: PolygonData[], parameter: string): CoopSelection => {
  const sorted = sortPragueDistricts(data);
  const decoded = decodeBooleans(parameter, data.length);
  const result: CoopSelection = {};
  sorted.forEach((polygon, index) => {
    result[polygon.id] = decoded[index];
  });
  return result;
}

export const getSelectionParameter = (router: NextRouter): string | undefined => {
  const param = router.query[selectionParameterName];
  if (typeof param === "string") {
    return param;
  } else {
    return undefined;
  }
}