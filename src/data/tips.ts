import {
  AreaTips,
  AreaTipsSource,
  ScrapedData,
  Tip,
  TipSource,
  TipType,
} from "@/types/tips";
import { auth, sheets_v4 } from "@googleapis/sheets";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { scrapeLinks } from "./scrape";

const tipsPath = "data/tips.json";

export function getTips(): AreaTips[] {
  const storedTips: AreaTips[] | undefined = existsSync(tipsPath)
    ? JSON.parse(readFileSync(tipsPath).toString())
    : undefined;
  if (!storedTips) {
    throw new Error("Tips are not yet loaded.");
  }
  return storedTips;
}

export async function updateAndStoreTips(): Promise<AreaTips[]> {
  const tipsSource = await getTipsSource();

  const storedTips: AreaTips[] | undefined = existsSync(tipsPath)
    ? JSON.parse(readFileSync(tipsPath).toString())
    : undefined;

  const storedLinks = new Set<string>(
    storedTips ? extractLinks(storedTips) : []
  );
  const linksToScrape = extractLinks(tipsSource).filter(
    (newLink) => !storedLinks.has(newLink)
  );
  const data = await scrapeLinks(linksToScrape);

  const result: AreaTips[] = [];
  for (const tipSource of tipsSource) {
    const storedTip = storedTips?.find((tip) => tip.id === tipSource.id);
    const description =
      storedTip && storedTip.description
        ? storedTip.description
        : getDescription(tipSource.url, data);

    const culture = getTip(storedTip, tipSource, "culture", data);
    const nature = getTip(storedTip, tipSource, "nature", data);
    const food = getTip(storedTip, tipSource, "food", data);

    result.push({
      id: tipSource.id,
      name: tipSource.name,
      url: description ? tipSource.url : "",
      description,
      culture,
      nature,
      food,
    });
  }

  writeFileSync(tipsPath, JSON.stringify(result));

  return result;
}

async function getTipsSource(): Promise<AreaTipsSource[]> {
  const googleAuth = new auth.GoogleAuth({
    keyFilename: "./google-sheets-secret.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const googleSheets = new sheets_v4.Sheets({ auth: googleAuth });

  const val = await googleSheets.spreadsheets.values.get({
    auth: googleAuth,
    spreadsheetId: "14BHQgaoyDDmz9vDWXsIdEAO1clW0tnSg7boMkkrH51A",
    range: "A1:M",
  });

  return (
    val.data.values
      ?.map((value, index) => {
        if (index < 4 || index > 60) {
          return null;
        }
        const areaTips: AreaTipsSource = {
          id: value[0],
          name: value[2],
          url: value[3],
        };
        const culture: TipSource = {
          name: value[4],
          url: value[5],
          comment: value[6],
        };
        const nature: TipSource = {
          name: value[7],
          url: value[8],
          comment: value[9],
        };
        const food: TipSource = {
          name: value[10],
          url: value[11],
          comment: value[12],
        };
        return {
          ...areaTips,
          ...(culture.url ? { culture } : {}),
          ...(nature.url ? { nature } : {}),
          ...(food.url ? { food } : {}),
        };
      })
      .filter(isAreaTips) ?? []
  );
}

const extractLinks = (
  areaTipsArray: (AreaTipsSource | AreaTips)[]
): string[] => {
  return areaTipsArray
    .flatMap((areaTips) => [
      areaTips.url,
      areaTips.culture?.url,
      areaTips.nature?.url,
      areaTips.food?.url,
    ])
    .filter(isString)
    .filter((url) => url !== "");
};

const isAreaTips = (value: AreaTipsSource | null): value is AreaTipsSource =>
  value !== null;

const isString = (value: string | undefined): value is string =>
  value !== undefined;

const getDescription = (url: string, data: ScrapedData[]): string => {
  return data.find((scrapedData) => scrapedData.url === url)?.description ?? "";
};

const getTip = (
  storedAreaTips: AreaTips | undefined,
  areaTipsSource: AreaTipsSource,
  property: TipType,
  data: ScrapedData[]
): Tip | undefined => {
  const storedTip = getTipByType(storedAreaTips, property);
  const tipSource = getTipSourceByType(areaTipsSource, property);
  return storedTip && storedTip.url === tipSource?.url
    ? storedTip
    : tipSource?.url
    ? findTip(tipSource.url, tipSource.comment, data)
    : undefined;
};

const getTipByType = (
  areaTips: AreaTips | undefined,
  type: TipType
): Tip | undefined => {
  if (typeof areaTips === "undefined") {
    return undefined;
  }
  switch (type) {
    case "culture":
      return areaTips.culture;
    case "nature":
      return areaTips.nature;
    case "food":
      return areaTips.food;
  }
};

const getTipSourceByType = (
  areaTips: AreaTipsSource,
  type: TipType
): TipSource | undefined => {
  switch (type) {
    case "culture":
      return areaTips.culture;
    case "nature":
      return areaTips.nature;
    case "food":
      return areaTips.food;
  }
};

const findTip = (
  url: string,
  comment: string,
  data: ScrapedData[]
): Tip | undefined => {
  const scrapedTip = data.find((scrapedData) => scrapedData.url === url);
  return scrapedTip && scrapedTip.name !== ""
    ? {
        name: scrapedTip.name,
        comment,
        description: scrapedTip.description,
        gps: scrapedTip.gps,
        imageUrl: scrapedTip.imageUrl,
        url,
      }
    : undefined;
};
