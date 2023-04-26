import Head from "next/head";
import { Selector } from "@/components/Selector";

export default function Home() {
  return (
    <>
      <Head>
        <title>Objev novou část Prahy</title>
      </Head>
      <Selector />
    </>
  );
}
