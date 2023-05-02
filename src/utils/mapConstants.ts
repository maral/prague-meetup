export enum MapStyle {
  Normal = "normal",
  Blind = "empty",
}

export enum MapSource {
  MapBox,
  OpenStreetMaps,
}

export interface MapSetMetadata {
  attribution: string;
  url: string;
}

const accessToken =
  "pk.eyJ1IjoibWFyZWtsaXN5IiwiYSI6ImNsZzhicW81ejB3N3AzaXBkaHN3ZmlxNGMifQ.2coMyxXBY8l3wt5i4dNb8A";
const user = "mareklisy";
const createMapBoxUrl = (styleId: string) =>
  `https://api.mapbox.com/styles/v1/${user}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`;

const mapbox: MapSetMetadata = {
  attribution: '&copy; <a href="https://www.mapbox.com">Mapbox</a>',
  url: createMapBoxUrl("clg8bw6d6002k01mgboi4vz0w"),
};

const mapboxBlind: MapSetMetadata = {
  attribution: '&copy; <a href="https://www.mapbox.com">Mapbox</a>',
  url: createMapBoxUrl("clgb26rpx003701n2fdjr0yb9"),
};

const openStreetMaps: MapSetMetadata = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
};

const cartoPositronNoLabels = {
  url: "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export const mapSources: { [key in MapStyle]: MapSetMetadata } = {
  [MapStyle.Normal]: openStreetMaps,
  [MapStyle.Blind]: cartoPositronNoLabels,
};
