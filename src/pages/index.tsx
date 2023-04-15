import Head from "next/head";
import { PolygonData } from "@/types/types";
import { Selector } from "@/components/Selector";

interface HomeProps {
  polygonData: PolygonData[];
}

export default function Home({ polygonData }: HomeProps) {
  return (
    <>
      <Head>
        <title>Objev novou část Prahy</title>
        <meta
          name="description"
          content="Potkej se s kamarády v části Prahy, kde jste ještě nebyli."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Selector />
    </>
  );
}
