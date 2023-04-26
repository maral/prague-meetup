import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import type { AppProps } from "next/app";
import { Mukta, Righteous, Urbanist, Varela } from "next/font/google";
import Head from "next/head";
const main = Mukta({ weight: "400", subsets: ["latin"] });
const secondary = Varela({ weight: "400", subsets: ["latin"] });
const lead = Urbanist({ weight: "800", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Potkej se s kamarády v části Prahy, kde jste ještě nebyli."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <style jsx global>
        {`
          :root {
            --main-font: ${main.style.fontFamily};
            --secondary-font: ${secondary.style.fontFamily};
            --lead-font: ${lead.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
