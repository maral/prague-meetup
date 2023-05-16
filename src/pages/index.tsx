import Head from "next/head";
import { Selector } from "@/components/layout/Selector";
import { useState } from "react";
import { About } from "@/components/layout/About";

export default function Home() {
  const [showAbout, setShowAbout] = useState(false);
  return (
    <>
      <Head>
        <title>Objevuj Prahu</title>
      </Head>
      {!showAbout && (
        <Selector openAbout={() => setShowAbout(true)} />
      )}

      {showAbout && (
        <About close={() => setShowAbout(false)} />
      )}
    </>
  );
}
