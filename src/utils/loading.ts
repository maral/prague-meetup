import {
  GeoJSONData,
  PolygonPropertiesMap,
  SortFunctionType,
} from "@/types/types";
import { readFileSync } from "fs";
import { join } from "path";
import { geoJsonToPolygonData, sortFunctionsMap } from "./data";
import { GetStaticProps } from "next";

interface JsonMetadata {
  fileName: string;
  propertiesMap: PolygonPropertiesMap;
  sortFunctionType: SortFunctionType | null;
}

const getPragueDistricts = (): JsonMetadata => {
  return {
    fileName: "prague-polygons.geojson",
    propertiesMap: {
      idKey: "OBJECTID",
      nameKey: "NAZEV_1",
    },
    sortFunctionType: SortFunctionType.PRAGUE_DISTRICTS,
  };
};

const getPragueParksAndForests = (): JsonMetadata => {
  return {
    fileName: "parks-nature-forests.geojson",
    propertiesMap: {
      idKey: "@id",
      nameKey: "name",
    },
    sortFunctionType: SortFunctionType.NAME_SORT,
  };
};

export const getPraguePolygonStaticProps: GetStaticProps = () => {
  try {
    const metadata = getPragueDistricts();

    const filePath = join(process.cwd(), "public", metadata.fileName);
    const fileContent = readFileSync(filePath, "utf8");
    const geoJsonData: GeoJSONData = JSON.parse(fileContent);

    const polygonData = geoJsonToPolygonData(
      geoJsonData,
      metadata.propertiesMap,
      metadata.sortFunctionType
        ? sortFunctionsMap[metadata.sortFunctionType]
        : null
    );

    return {
      props: {
        polygonData,
      },
    };
  } catch (error) {
    console.error("Error reading GeoJSON file:", error);

    return {
      notFound: true,
    };
  }
};