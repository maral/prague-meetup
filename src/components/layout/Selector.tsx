import Link from "next/link";
import { useState } from "react";
import {
  HeartFill,
  Hypnotize,
  Map,
  People,
  XLg,
} from "react-bootstrap-icons";
import ExternalLink from "../ui/ExternalLink";

interface CardOption {
  path: string;
  type: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

interface SelectorProps {
  openAbout: () => void;
}

export function Selector({ openAbout }: SelectorProps) {
  const [showAbout, setShowAbout] = useState(false);

  const options: CardOption[] = [
    {
      path: "/vyber-s-prateli",
      type: "Spolupráce",
      title: "Výběr s přáteli",
      description:
        "Chceš se potkat s přáteli a zatím nevíš kde? Co zkusit nové místo v Praze? Označte společně místa, kde jste už byli a vybereme vám novou městskou část k objevení.",
      icon: <People />, //<EmojiSmile />,
    },
    {
      path: "/slepa-mapa",
      type: "Kvíz",
      title: "Slepá mapa",
      description:
        "Poznej co nejvíce městských části na slepé mapě. Z těch, které neuhodneš, ti jednu vybereme. Tu budeš mít za úkol navštívit.",
      icon: <Map size={44} className="mb-1" />,
    },
    {
      path: "/ruleta",
      type: "Náhoda",
      title: "Ruleta",
      description:
        "Chceš objevovat Prahu, ale nerad se rozhoduješ? Zatoč si ruletou, ktrerá to rozsekne za tebe.",
      icon: <Hypnotize className="mb-1" />, //<Disc />
    },
  ];

  return (
    <>
      {!showAbout && (
        <section className="mx-auto flex min-h-screen max-w-[80rem] flex-col px-8 font-primary">
          <div className=" pt-4 text-right md:absolute md:right-8 md:top-8 md:pt-0 md:text-lg">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => openAbout()}
            >
              O aplikaci
            </button>
          </div>

          <div className="m-auto">
            <div className="mx-auto w-full text-left md:w-11/12 md:text-center xl:w-9/12">
              <h1 className="mb-5 mt-5 block pb-2 font-lead text-4xl font-extrabold text-indigo-700 md:text-6xl">
                Objev novou část Prahy
              </h1>
              <p className="mb-10 px-0 text-lg text-gray-500 lg:mb-20 lg:px-24 lg:text-xl">
                Praha má 57 městských částí. Nech se zavést tam, kam tě nohy ani
                mapy zatím nedovedly. Vyber si, jak je budeš objevovat.
              </p>
            </div>
            <div className="mx-auto mb-10 w-full">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
                {options.map((option, index) => (
                  <Link
                    href={option.path}
                    key={index}
                    className="group rounded-md border-0 bg-indigo-50 shadow-md shadow-indigo-500/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 md:rounded-lg"
                  >
                    <div className="flex flex-col justify-between p-6">
                      <div className="flex min-h-min flex-row items-end justify-between pb-8 md:min-h-[9rem] xl:min-h-min">
                        <div className=" ">
                          <p className="mb-1 text-lg font-semibold text-green-550">
                            {option.type}
                          </p>
                          <h2 className="mt-2 font-primary text-4xl font-extrabold text-gray-800">
                            {option.title}
                          </h2>
                        </div>
                        <div className="px-4 text-5xl text-indigo-700">
                          {option.icon}
                        </div>
                      </div>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showAbout && (
        <section className="absolute bottom-0 left-0 right-0 top-0 z-1000 min-h-screen w-full overflow-auto bg-white px-8 font-primary">
          <button
            className="absolute right-6 top-6 transition-all hover:scale-110 md:right-8 md:top-8"
            onClick={() => setShowAbout(false)}
          >
            <XLg size={32} />
          </button>
          <div className="mx-auto w-full md:w-9/12 xl:w-[60rem]">
            <h2 className="mb-8 mt-8 font-lead text-4xl font-extrabold text-indigo-700 md:mt-16">
              O aplikaci Objevuj Prahu
            </h2>
            <div className="mb-16 text-lg">
              <p className="mb-4">
                Milý uživateli, děkuji, že jsi zavítal na moji aplikaci a
                doufám, že ti přinesla zábavu a užitek. Nápad na aplikaci jsem
                dostal, když jsme se měli potkat s kamarádem a nechtělo se nám
                chodit na místa, kde jsme už byli. Praha je obrovská a existuje tu
                spoustu zajímavých míst, sídlišť, roztomilých vilových čtvrtí,
                parků, kostelů, památek a to vše stojí za objevování.
              </p>
              <p className="mb-4">
                Projekt vznikl během několika málo týdnů, kdy jsem si chtěl
                vyzkoušet několik nových technologií a zároveň vytvořit něco
                užitečného.
              </p>

              <h3 className="mb-4 mt-8 font-lead text-2xl text-indigo-700">
                Kde najdu přehledně všechna místa najednou?
              </h3>

              <p className="mb-4">
                Nechtěl jsem vytvořit další stránku typu{" "}
                <em>50 nejkrásnějších míst v Praze</em>. Mojí ambicí není
                vytvořit vyčerpávající výčet všech skvělých zajímavých míst,
                které Praha skýtá. Objevuj Prahu tě má dostat z komfortní zóny,
                přinést trochu náhody a spontánnosti a přenést tě na místo,
                které by tě zkrátka jinak nenapadlo nebo nelákalo.
              </p>

              <p className="mb-4">
                Pokud se ti můj přístup nelíbí,
                <ExternalLink href="https://www.prague.eu/cs/deti">na</ExternalLink>{" "}
                <ExternalLink href="https://ifenomen.cz/cestovani/9-nejtajemnejsich-mist-prahy">internetu</ExternalLink>{" "}
                <ExternalLink href="https://www.kudyznudy.cz/aktuality/10-tipu-kam-jit-na-prochazku-v-praze">najdeš</ExternalLink>{" "}
                <ExternalLink href="https://www.westwing.cz/inspiration/lifestyle/cestovani/20-nejlepsich-tipu-kam-na-vylet-v-praze/">spoustu</ExternalLink>{" "}
                <ExternalLink href="https://www.seznamzpravy.cz/clanek/kam-v-praze-za-prirodou-109855">článků</ExternalLink>{" "}
                <ExternalLink href="https://www.dianaella.com/2021/10/24/14-tipu-kam-v-praze-na-prochazku-do-prirody/">a</ExternalLink>{" "}
                <ExternalLink href="https://www.slevomat.cz/magazin/2034-vylety-praha">seznamů</ExternalLink>,{" "}
                které ti nabídnou mnohem více tipů, než je v této aplikaci.
              </p>

              <h3 className="mb-4 mt-8 font-lead text-2xl text-indigo-700">
                Poděkování{" "}
                <HeartFill size={20} className="inline-block text-rose-500" />
              </h3>
              <p className="mb-4">
                Děkuji všem, kteří mi pomohli a dodali tipy na zajímavá místa k
                navštívení. Bylo vás mnoho, jmenovat můžu ty, kteří mi zanechali
                své jméno:{" "}
              </p>
              <ul className="mb-4 mt-2 list-disc pl-8">
                <li>Nalim </li>
                <li>jamampravosedet</li>
                <li>mllmarek</li>
                <li>janarericha</li>
              </ul>
              <p className="mb-4">
                Kdo by mi chtěl ještě přispět (stále je řada míst bez vyplněných
                všech 3 tipů), tak prosím{" "}
                <ExternalLink href="https://forms.gle/oPZUQg4vNBofSPpE7">
                  sem do formuláře
                </ExternalLink>
                , díky!
              </p>

              <h3 className="mb-4 mt-8 font-lead text-2xl text-indigo-700">
                Použité technologie
              </h3>
              <p className="mb-4">
                Aplikace je postavená na Reactu, Next.js a Tailwind CSS. Data o
                městských částech se načítají automaticky z Google tabulky, do
                které jsme společně posbírali tipy na zajímavá místa. Obrázky a
                doprovodné texty k jednotlivým městským částem jsou převzaty z
                Mapy.cz (tímto žádám o prominutí a prosím, nežalujte mě 😨😁).
                Zdrojové kódy jsou k dispozici na{" "}
                <ExternalLink href="https://github.com/maral/prague-meetup">
                  Githubu
                </ExternalLink>
              </p>

              <h3 className="mb-4 mt-8 font-lead text-2xl text-indigo-700">
                Chcete mě? 🐶🐕
              </h3>
              <p className="mb-4">
                Po několika letech ve školství se opět vracím do IT. Pokud
                hledáte do party někoho na remote (protože v září se přesouvám
                na 2 roky do Itálie), ozvěte se mi. Mám rád velké výzvy, řešení
                náročných problémů, rád se učím a hraju si s novými
                technologiemi jak na frontendu, tak na backendu.
              </p>
              <p className="mb-4">
                Spoluzaložil jsem aplikaci{" "}
                <ExternalLink href="https://www.vcelka.cz">Včelka</ExternalLink>
                . V posledním roce jsem pomohl převést{" "}
                <ExternalLink href="https://www.spadovostpraha.cz">
                  spádové oblasti pražských základních škol z PDF na mapu
                </ExternalLink>
                , hrál jsem si s
                <ExternalLink href="https://mareklisy.cz/gen-art/">
                  generativním uměním
                </ExternalLink>
                . Aktuálně se učím smysluplně využívat v aplikacích GPT a
                pracuji na digitalizaci spádových oblastí pro celou ČR.
              </p>
              <p className="mb-4">
                Více na mém{" "}
                <ExternalLink href="https://www.linkedin.com/in/mareklisy/">
                  LinkendInu
                </ExternalLink>
                , najdete mě taky na{" "}
                <ExternalLink href="https://twitter.com/LisyMarek">
                  Twitteru
                </ExternalLink>
                .
              </p>

              <p className="mt-8">
                Děkuji za návštěvu, někdy zase přijď!<br />
                Marek Lisý
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
