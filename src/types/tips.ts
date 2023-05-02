export interface TipSource {
  name: string;
  url: string;
  comment: string;
}

export interface AreaTipsSource {
  id: string;
  name: string;
  url: string;
  culture?: TipSource;
  nature?: TipSource;
  food?: TipSource;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface ScrapedData {
  name: string;
  description: string;
  imageUrl: string;
  url: string;
  gps: Coordinates;
}

export interface Tip extends ScrapedData {
  comment: string;
}

export interface AreaTips {
  id: string;
  name: string;
  description: string;
  url: string;
  culture?: Tip;
  nature?: Tip;
  food?: Tip;
}

export type TipType = "culture" | "nature" | "food";

export enum TipReason {
  OnlyOption,
  UserSelected,
  RandomlySelected,
}
