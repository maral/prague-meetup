import L, { PointExpression } from "leaflet";

const iconAnchor: PointExpression = [32, 56];
const iconSize: PointExpression = [64, 64];

export const cultureIcon = new L.Icon({
  iconUrl: "/markers/map_marker_building.svg",
  iconRetinaUrl: "/markers/map_marker_building.svg",
  iconSize,
  iconAnchor,
});

export const natureIcon = new L.Icon({
  iconUrl: "/markers/map_marker_tree.svg",
  iconRetinaUrl: "/markers/map_marker_tree.svg",
  iconSize,
  iconAnchor,
});

export const foodIcon = new L.Icon({
  iconUrl: "/markers/map_marker_cup.svg",
  iconRetinaUrl: "/markers/map_marker_cup.svg",
  iconSize,
  iconAnchor,
});
