import { TipReason } from "@/types/tips";
import { countCorrect, getIncorrect } from "@/utils/data";
import sample from "lodash/sample";

export enum GameState {
  NotStarted = "notStarted",
  Started = "started",
  Paused = "paused",
  AllCorrect = "allCorrect",
  ChoosingMode = "choosingMode",
  SelectingMunicipality = "selectingMunicipality",
  ShowTips = "showTips",
}

export interface BlindMapState {
  toGuessList: string[];
  gameState: GameState;
  guesses: string[];
  current: number;
  reason?: TipReason;
  tipId?: string;
}

export enum BlindMapActionType {
  START = "start",
  SELECT = "select",
  NEXT = "next",
  FINISH = "finish",
  MANUALLY_SELECT = "manually-select",
  RANDOMLY_SELECT = "randomly-select",
  SELECT_MUNICIPALITY = "select-municipality",
  RESTART = "restart",
}

export interface BlindMapAction {
  type: BlindMapActionType;
  payload?: any;
}

export const blindMapReducer = (
  state: BlindMapState,
  action: BlindMapAction
): BlindMapState => {
  switch (action.type) {
    case BlindMapActionType.START:
      return {
        ...state,
        gameState: GameState.Started,
        toGuessList: action.payload,
        guesses: [],
        current: 0,
      };

    case BlindMapActionType.SELECT:
      return {
        ...state,
        gameState: GameState.Paused,
        guesses: [...state.guesses, action.payload],
      };

    case BlindMapActionType.NEXT:
      return {
        ...state,
        gameState: GameState.Started,
        current: state.current + 1,
      };

    case BlindMapActionType.RESTART:
      return {
        ...state,
        gameState: GameState.NotStarted,
      };

    case BlindMapActionType.FINISH: {
      const correct = countCorrect(state.toGuessList, state.guesses);

      if (state.toGuessList.length - correct === 1) {
        return {
          ...state,
          gameState: GameState.ShowTips,
          reason: TipReason.OnlyOption,
          tipId: getIncorrect(state.toGuessList, state.guesses)[0],
        };
      } else {
        return {
          ...state,
          gameState:
            correct === state.toGuessList.length
              ? GameState.AllCorrect
              : GameState.ChoosingMode,
        };
      }
    }

    case BlindMapActionType.MANUALLY_SELECT: {
      return {
        ...state,
        gameState: GameState.SelectingMunicipality,
      };
    }

    case BlindMapActionType.SELECT_MUNICIPALITY: {
      return {
        ...state,
        gameState: GameState.ShowTips,
        reason: TipReason.UserSelected,
        tipId: action.payload,
      };
    }

    case BlindMapActionType.RANDOMLY_SELECT: {
      return {
        ...state,
        gameState: GameState.ShowTips,
        reason: TipReason.RandomlySelected,
        tipId: sample(getIncorrect(state.toGuessList, state.guesses)),
      };
    }

    default:
      return state;
  }
};
