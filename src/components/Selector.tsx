import Link from "next/link";

interface CardOption {
  path: string;
  type: string;
  title: string;
  description: string;
}

export function Selector() {
  const options: CardOption[] = [
    {
      path: "/vyber-s-prateli",
      type: "Spolupráce",
      title: "Výběr s přáteli",
      description:
        "Vyber všechny MČ, kde jsi už byl. Pošli výsledek kamarádovi. Po jeho vyplnění dostanete návrh, kam zajít.",
    },
    {
      path: "/slepa-mapa",
      type: "Testík",
      title: "Slepá mapa",
      description:
        "Poznej co nejvíc městských částí na slepé mapě. Z těch, které neuhodneš, dostaneš jednu za úkol navštívit.",
    },
    {
      path: "/ruleta",
      type: "Překvápko",
      title: "Ruleta",
      description: "Vyberte mi, jakou městskou část mám navštívit. ",
    },
  ];

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl px-4">
      <div className="m-auto">
        <div className="mx-auto w-full text-left md:w-11/12 md:text-center xl:w-9/12">
          <h1 className="mb-5 mt-5 block pb-2 font-lead text-4xl font-extrabold text-indigo-700 md:text-6xl">
            Objev novou část Prahy
          </h1>
          <p className="mb-10 px-0 text-lg text-gray-500 lg:mb-20 lg:px-24 lg:text-xl">
            Praha má 57 městských částí. Vyber si, jak je chceš objevovat.
          </p>
        </div>
        <div className="mx-auto mb-10 w-full xl:w-4/5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
            {options.map((option, index) => (
              <Link
                href={option.path}
                key={index}
                className="group rounded-none border-0 bg-indigo-50 shadow-md shadow-indigo-500/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 md:rounded-lg"
              >
                <div className="flex flex-col justify-between p-6">
                  <p className="mb-1 text-lg font-semibold text-[#38ca8c]">
                    {option.type}
                  </p>
                  <p className="my-2 pb-6 font-primary text-4xl font-extrabold text-gray-800">
                    {option.title}
                  </p>
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
