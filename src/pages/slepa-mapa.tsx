import Head from "next/head";
import { GetStaticProps } from "next";
import { PolygonColor, PolygonData, PolygonOptionsMap } from "@/types/types";
import { getPraguePolygonStaticProps } from "@/utils/loading";
import MapLayout from "@/components/layout/MapLayout";
import Separator from "@/components/ui/Separator";
import GuessCorrect from "@/components/blind-map/GuessCorrect";
import GuessWrong from "@/components/blind-map/GuessWrong";
import GuessUnknown from "@/components/blind-map/GuessUnknown";
import { useMemo, useReducer } from "react";
import {
  BlindMapActionType,
  GameState,
  blindMapReducer,
} from "@/state/blindMapState";
import PanelH2 from "@/components/ui/PanelH2";
import sampleSize from "lodash/sampleSize";
import { PanelButton } from "@/components/ui/PanelButton";
import { MapStyle } from "@/utils/mapConstants";
import { countCorrect, getIncorrect, sortPragueDistricts } from "@/utils/data";
import Results from "@/components/blind-map/Results";
import Tips from "@/components/common/Tips";
import { InfoCircleFill } from "react-bootstrap-icons";
import Pill from "@/components/ui/Pill";
import SelectingMunicipality from "@/components/common/SelectingMunicipality";
import { TipReason } from "@/types/tips";

interface BlindMapProps {
  polygonData: PolygonData[];
}

export default function BlindMap({ polygonData }: BlindMapProps) {
  const [state, dispatch] = useReducer(blindMapReducer, {
    toGuessList: [],
    gameState: GameState.NotStarted,
    guesses: [],
    current: 0,
  });

  const incorrectCount =
    state.toGuessList.length - countCorrect(state.toGuessList, state.guesses);

  const incorrect =
    state.gameState === GameState.SelectingMunicipality
      ? getIncorrect(state.toGuessList, state.guesses)
      : [];

  const selectedPolygon = state.tipId
    ? polygonData.find((polygon) => polygon.id === state.tipId)
    : undefined;

  const polygonOptionsMap: PolygonOptionsMap = Object.fromEntries(
    polygonData.map((polygon) => {
      const isCurrentGuess = state.guesses[state.current] === polygon.id;
      const isCurrentToGuess = state.toGuessList[state.current] === polygon.id;
      return [
        polygon.id,
        state.gameState === GameState.Paused
          ? {
              showName: isCurrentGuess || isCurrentToGuess,
              color: isCurrentToGuess
                ? PolygonColor.Correct
                : isCurrentGuess
                ? PolygonColor.Wrong
                : PolygonColor.Neutral,
            }
          : state.gameState === GameState.SelectingMunicipality &&
            incorrect.includes(polygon.id)
          ? {
              showName: true,
              color: PolygonColor.Wrong,
            }
          : state.gameState === GameState.ShowTips &&
            selectedPolygon &&
            selectedPolygon.id === polygon.id
          ? { showName: true, color: PolygonColor.Focused }
          : {
              showName: false,
              color: PolygonColor.Neutral,
            },
      ];
    })
  );

  const polygonNameMap = Object.fromEntries(
    polygonData.map((polygon) => [polygon.id, polygon.name])
  );

  const startGameFactory = (rounds: number) => () => {
    const toGuess = sampleSize(
      polygonData.map((polygon) => polygon.id),
      rounds
    );
    dispatch({ type: BlindMapActionType.START, payload: toGuess });
  };

  const currentPolygon = useMemo(() => {
    return [GameState.Started, GameState.Paused].includes(state.gameState)
      ? polygonData.find(
          (polygon) => polygon.id === state.toGuessList[state.current]
        )
      : undefined;
  }, [state, polygonData]);

  const polygonOnClickFactory = (id: string) => () => {
    if (state.gameState === GameState.Started) {
      dispatch({ type: BlindMapActionType.SELECT, payload: id });
      setTimeout(() => {
        if (state.current >= state.toGuessList.length - 1) {
          dispatch({ type: BlindMapActionType.FINISH });
        } else {
          dispatch({ type: BlindMapActionType.NEXT });
        }
      }, 1500);
    }
    if (
      state.gameState === GameState.SelectingMunicipality &&
      incorrect.includes(id)
    ) {
      dispatch({ type: BlindMapActionType.SELECT_MUNICIPALITY, payload: id });
    }
  };

  return (
    <>
      <Head>
        <title>Objevuj Prahu - Slepá mapa</title>
      </Head>
      <MapLayout
        polygonData={polygonData}
        polygonOptionsMap={polygonOptionsMap}
        mapStyle={
          state.gameState === GameState.ShowTips
            ? MapStyle.Normal
            : MapStyle.Blind
        }
        onClickFactory={polygonOnClickFactory}
        showPanel={true}
        panelExpanded={state.gameState === GameState.ShowTips}
        panelTitle="Slepá mapa"
        focus={
          [GameState.NotStarted, GameState.Paused].includes(state.gameState)
            ? "all"
            : state.gameState === GameState.ShowTips && selectedPolygon
            ? selectedPolygon.id
            : undefined
        }
        tips={selectedPolygon?.tips}
      >
        {state.gameState === GameState.NotStarted && (
          <>
            <PanelH2>Zvol si délku hry</PanelH2>

            <div className="grid grid-cols-1 gap-6">
              <PanelButton
                onClick={startGameFactory(10)}
                title="Krátká"
                subtitle="10 městských částí"
              />
              <PanelButton
                onClick={startGameFactory(25)}
                title="Střední"
                subtitle="25 městských částí"
              />
              <PanelButton
                onClick={startGameFactory(polygonData.length)}
                title="Celá Praha"
                subtitle="57 městských částí"
              />
            </div>
          </>
        )}

        {[GameState.Started, GameState.Paused].includes(state.gameState) && (
          <>
            <div className="text-gray-600">
              Úkol {state.current + 1} / {state.toGuessList.length}
            </div>
            <PanelH2>
              Najdi na mapě MČ <Pill>{currentPolygon?.name}</Pill>.
            </PanelH2>
            <div className="text-md font-primary text-lg">
              <Separator className="my-4" />
              <ul>
                {state.current < state.toGuessList.length &&
                  (state.current !== state.toGuessList.length - 1 ||
                    state.gameState !== GameState.Paused) && <GuessUnknown />}
                {state.guesses.map((_, index) => {
                  const reversedIndex = state.guesses.length - index - 1;
                  return state.guesses[reversedIndex] ===
                    state.toGuessList[reversedIndex] ? (
                    <GuessCorrect
                      key={index}
                      name={polygonNameMap[state.toGuessList[reversedIndex]]}
                    />
                  ) : (
                    <GuessWrong
                      key={index}
                      wrong={polygonNameMap[state.guesses[reversedIndex]]}
                      correct={polygonNameMap[state.toGuessList[reversedIndex]]}
                    />
                  );
                })}
              </ul>
            </div>
          </>
        )}

        {[
          GameState.AllCorrect,
          GameState.ChoosingMode,
          GameState.SelectingMunicipality,
          GameState.ShowTips,
        ].includes(state.gameState) && (
          <>
            <Results
              toGuessList={state.toGuessList}
              guesses={state.guesses}
              polygonNameMap={polygonNameMap}
            />

            {state.gameState === GameState.AllCorrect && (
              <>
                <PanelH2>Jsi lepší, než jsme čekali</PanelH2>
                <p>
                  Protože znáš Prahu perfektně, nemáme pro tebe zatím žádné
                  místo k objevování. Vyber si, co dál.
                </p>

                <div className="mt-6 flex flex-col gap-6">
                  <PanelButton
                    title="Zahraju si znovu"
                    subtitle="Nějaká chyba musí přijít"
                    onClick={() =>
                      dispatch({ type: BlindMapActionType.RESTART })
                    }
                  />
                  <PanelButton
                    title="Nechám svůj osud ruletě"
                    subtitle="Vybereme za tebe"
                    href="/ruleta"
                  />
                </div>
              </>
            )}

            {state.gameState === GameState.ChoosingMode && (
              <>
                <PanelH2>Kam to bude?</PanelH2>
                <p>
                  Máme pro tebe {incorrectCount}{" "}
                  {incorrectCount < 5 ? "místa" : "míst"} k objevení. Jak je
                  chceš vybrat?
                </p>
                <div className="mt-6 flex min-w-[50%] flex-col gap-6 lg:w-full">
                  <PanelButton
                    title="Budu si vybírat já"
                    subtitle="Neponechám to náhodě"
                    onClick={() =>
                      dispatch({ type: BlindMapActionType.MANUALLY_SELECT })
                    }
                  />
                  <PanelButton
                    title="Vyberte za mě"
                    subtitle="Nechci se rozhodovat"
                    onClick={() =>
                      dispatch({ type: BlindMapActionType.RANDOMLY_SELECT })
                    }
                  />
                </div>
              </>
            )}

            {state.gameState === GameState.SelectingMunicipality && (
              <SelectingMunicipality
                polygons={incorrect.map((id) => ({
                  id,
                  name: polygonNameMap[id],
                }))}
                onMunicipalitySelect={(id) =>
                  dispatch({
                    type: BlindMapActionType.SELECT_MUNICIPALITY,
                    payload: id,
                  })
                }
              />
            )}

            {state.gameState === GameState.ShowTips && (
              <>
                <p className="mb-6 flex items-start gap-1 italic text-gray-600 ">
                  <InfoCircleFill size={14} className="mr-1 mt-1 inline" />
                  <span>
                    {state.reason === TipReason.OnlyOption &&
                      "Tvoje jediná chyba je tvým osudem."}
                    {state.reason === TipReason.RandomlySelected &&
                      "Vybrali jsme jednu z nenalezených městských částí."}
                    {state.reason === TipReason.UserSelected &&
                      "Byla to tvoje volba."}
                  </span>
                </p>
                {selectedPolygon && <Tips tips={selectedPolygon.tips} />}
                <PanelButton
                  className="mt-6 w-full"
                  title="Zahraju si znovu"
                  subtitle="Určitě to dám ještě líp"
                  onClick={() => dispatch({ type: BlindMapActionType.RESTART })}
                />
              </>
            )}
          </>
        )}
      </MapLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return getPraguePolygonStaticProps(context);
};
