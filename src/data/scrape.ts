import { Coordinates, ScrapedData } from "@/types/tips";
import { chromium } from "playwright";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

async function scrapePage(url: string): Promise<ScrapedData> {
  const browser = await chromium.launch();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const content = await page.content();
  // const filename = cutStringSinceLastSlash(url);
  // writeFileSync(`data/${filename}.html`, content);
  const $ = cheerio.load(content);

  const title = $("div.content-title h1").text().trim();
  const description = $(".content-description > span").text().trim();
  const imageURL = $("#detail div.content-poster img[src]").attr("src") ?? "";
  const gps = $("#detail div.gps p.coordinates-para").text().trim();

  await browser.close();

  return {
    name: title,
    description,
    imageUrl: sanitizeImageUrl(imageURL),
    gps: parseCoordinates(gps),
    url,
  };
}

export async function scrapeLinks(links: string[]): Promise<ScrapedData[]> {
  const data: ScrapedData[] = [];
  console.log(`${links.length} links to be scraped.`);
  for (const link of links) {
    console.log(`Scraping ${link}`);
    data.push(await scrapePage(link));
    await delay(500);
  }

  return data;
}

const parseCoordinates = (gps: string): Coordinates => {
  const [lat, lon] = gps.split(",").map((coord) => parseFloat(coord));
  const latDir = gps.split(",")[0].trim().slice(-1) === "N" ? 1 : -1;
  const lonDir = gps.slice(-1) === "E" ? 1 : -1;

  return {
    lat: latDir * lat,
    lng: lonDir * lon,
  };
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const sanitizeImageUrl = (url: string): string => {
  if (url.substring(0, 2) === "//") {
    url = `https:${url}`;
  } else if (url[0] === "/") {
    url = `https://mapy.cz${url}`;
  }
  return removeQueryString(url) + "?fl=res,800,600,1";
};

const cutStringSinceLastSlash = (input: string): string => {
  const lastSlashIndex = input.lastIndexOf("/");
  return lastSlashIndex !== -1 ? input.substring(lastSlashIndex + 1) : input;
};

const removeQueryString = (s: string) => s.split("?")[0];
