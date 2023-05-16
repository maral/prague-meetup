import {
  HeartFill, XLg
} from "react-bootstrap-icons";
import ExternalLink from "../ui/ExternalLink";

interface AboutProps {
  close: () => void;
}

export function About({ close }: AboutProps) {
  return (
    <section className="absolute bottom-0 left-0 right-0 top-0 z-1000 min-h-screen w-full overflow-auto bg-white px-8 font-primary">
      <button
        className="absolute right-6 top-6 transition-all hover:scale-110 md:right-8 md:top-8"
        onClick={() => close()}
      >
        <XLg size={32} />
      </button>
      <div className="mx-auto w-full md:w-[48rem]">
        <h2 className="mb-8 mt-8 font-lead text-4xl font-extrabold text-indigo-700 md:mt-16">
          O aplikaci Objevuj Prahu
        </h2>
        <div className="mb-16 text-lg">
          <Paragraph>
            Milý uživateli, děkuji, že jsi zavítal na moji aplikaci a
            doufám, že ti přinesla zábavu a užitek. Nápad na aplikaci jsem
            dostal, když jsme se měli potkat s kamarádem a nechtělo se nám
            chodit na místa, kde jsme už byli. Praha je obrovská a existuje tu
            spoustu zajímavých míst, sídlišť, roztomilých vilových čtvrtí,
            parků, kostelů, památek a to vše stojí za objevování.
          </Paragraph>
          <Paragraph>
            Projekt vznikl během několika málo týdnů, kdy jsem si chtěl
            vyzkoušet několik nových technologií a zároveň vytvořit něco
            užitečného.
          </Paragraph>

          <H3>
            Kde najdu přehledně všechna místa najednou?
          </H3>

          <Paragraph>
            Nechtěl jsem vytvořit další stránku typu{" "}
            <em>50 nejkrásnějších míst v Praze</em>. Mojí ambicí není
            vytvořit vyčerpávající výčet všech skvělých zajímavých míst,
            které Praha skýtá. Objevuj Prahu tě má dostat z komfortní zóny,
            přinést trochu náhody a spontánnosti a přenést tě na místo,
            které by tě zkrátka jinak nenapadlo nebo nelákalo.
          </Paragraph>

          <Paragraph>
            Pokud se ti můj přístup nelíbí,{" "}
            <ExternalLink href="https://www.prague.eu/cs/deti">na</ExternalLink>{" "}
            <ExternalLink href="https://ifenomen.cz/cestovani/9-nejtajemnejsich-mist-prahy">internetu</ExternalLink>{" "}
            <ExternalLink href="https://www.kudyznudy.cz/aktuality/10-tipu-kam-jit-na-prochazku-v-praze">najdeš</ExternalLink>{" "}
            <ExternalLink href="https://www.westwing.cz/inspiration/lifestyle/cestovani/20-nejlepsich-tipu-kam-na-vylet-v-praze/">spoustu</ExternalLink>{" "}
            <ExternalLink href="https://www.seznamzpravy.cz/clanek/kam-v-praze-za-prirodou-109855">článků</ExternalLink>{" "}
            <ExternalLink href="https://www.dianaella.com/2021/10/24/14-tipu-kam-v-praze-na-prochazku-do-prirody/">a</ExternalLink>{" "}
            <ExternalLink href="https://www.slevomat.cz/magazin/2034-vylety-praha">seznamů</ExternalLink>,{" "}
            které ti nabídnou spoustu zajímavých míst bez nutnosti se prokousat
            slepou mapou nebo náhodným výběrem.
          </Paragraph>

          <H3>
            Poděkování{" "}
            <HeartFill size={20} className="inline-block text-rose-500" />
          </H3>
          <Paragraph>
            Děkuji všem, kteří mi pomohli a dodali tipy na zajímavá místa k
            navštívení. Bylo vás mnoho, jmenovat můžu ty, kteří mi zanechali
            své jméno:{" "}
          </Paragraph>
          <ul className="mb-4 mt-2 list-disc pl-8">
            <li>Nalim </li>
            <li>jamampravosedet</li>
            <li>mllmarek</li>
            <li>janarericha</li>
          </ul>
          <Paragraph>
            Také děkuji své nejskvělejší manželce, která mi pomohla odladit
            aplikaci a vylepšit grafiku a texty.
          </Paragraph>
          <Paragraph>
            Kdo by mi chtěl ještě přispět (stále je řada míst bez vyplněných
            všech 3 tipů), tak prosím{" "}
            <ExternalLink href="https://forms.gle/oPZUQg4vNBofSPpE7">
              sem do formuláře
            </ExternalLink>
            , díky!
          </Paragraph>

          <H3>
            Použité technologie
          </H3>
          <Paragraph>
            Aplikace je postavená na Reactu, Next.js a Tailwind CSS. Data o
            městských částech se načítají automaticky z Google tabulky, do
            které jsme společně posbírali tipy na zajímavá místa. Obrázky a
            doprovodné texty k jednotlivým městským částem jsou převzaty z
            Mapy.cz (tímto žádám o prominutí a prosím, nežalujte mě 😨😁).
            Zdrojové kódy jsou k dispozici na{" "}
            <ExternalLink href="https://github.com/maral/Paragraphrague-meetup">
              Githubu
            </ExternalLink>
          </Paragraph>

          <H3>
            Chcete mě? 🐶🐕
          </H3>
          <Paragraph>
            Po několika letech ve školství se opět vracím do IT. Pokud
            hledáte do party někoho na remote (protože v září se přesouvám
            na 2 roky do Itálie), ozvěte se mi. Mám rád velké výzvy, řešení
            náročných problémů, rád se učím a hraju si s novými
            technologiemi jak na frontendu, tak na backendu.
          </Paragraph>
          <Paragraph>
            Spoluzaložil jsem aplikaci{" "}
            <ExternalLink href="https://www.vcelka.cz">Včelka</ExternalLink>
            . V posledním roce jsem pomohl převést{" "}
            <ExternalLink href="https://www.spadovostpraha.cz">
              spádové oblasti pražských základních škol z PDF na mapu
            </ExternalLink>
            , hrál jsem si s{" "}
            <ExternalLink href="https://mareklisy.cz/gen-art/">
              generativním uměním
            </ExternalLink>
            . Aktuálně se učím smysluplně využívat v aplikacích GPT a
            pracuji na digitalizaci spádových oblastí pro celou ČR.
          </Paragraph>
          <Paragraph>
            Více na mém{" "}
            <ExternalLink href="https://www.linkedin.com/in/mareklisy/">
              LinkendInu
            </ExternalLink>
            , najdete mě taky na{" "}
            <ExternalLink href="https://twitter.com/LisyMarek">
              Twitteru
            </ExternalLink>
            .
          </Paragraph>

          <p className="mt-8">
            Děkuji za návštěvu a někdy se zase zastav!<br />
            Marek Lisý
          </p>
        </div>
      </div>
    </section>
  );
}

function H3 ({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 mt-12 font-lead text-2xl text-indigo-700">
      {children}
    </h3>
  );
}

function Paragraph ({ children }: { children: React.ReactNode }) {
  return <p className="mb-4">{children}</p>;
}
