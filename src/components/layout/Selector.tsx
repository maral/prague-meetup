import Link from "next/link";
import { Disc, EmojiSmile, Hypnotize, Map, People } from "react-bootstrap-icons";

interface CardOption {
  path: string;
  type: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export function Selector() {
  const options: CardOption[] = [
    {
      path: "/vyber-s-prateli",
      type: "Spolupráce",
      title: "Výběr s přáteli",
      description:
        "Vyber všechny městské části, které už znáš. Pošli výsledek kamárádovi. Po vyplnění dostanete návrhy na nová zajímavá místa, kam můžete společně zajít.",
      icon: <People /> //<EmojiSmile />,
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
    <section className="mx-auto flex min-h-screen max-w-[80rem] px-8 font-primary">
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
                className="group rounded-none border-0 bg-indigo-50 shadow-md shadow-indigo-500/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 md:rounded-lg"
              >
                <div className="flex flex-col justify-between p-6">
                  <div className="flex flex-row justify-between items-end pb-8 min-h-min md:min-h-[9rem] xl:min-h-min">
                    <div className=" ">
                      <p className="mb-1 text-lg font-semibold text-green-550">
                        {option.type}
                      </p>
                      <h2 className="mt-2 font-primary text-4xl font-extrabold text-gray-800">
                        {option.title}
                      </h2>
                    </div>
                    <div className="text-5xl text-indigo-700 px-4">
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
  );
}
