import Head from "next/head";
import { Selector } from "@/components/layout/Selector";

export default function Home() {
  return (
    <>
      <Head>
        <title>Objevuj nová místa v Praze</title>
      </Head>
      <Selector />
    </>
  );
}
