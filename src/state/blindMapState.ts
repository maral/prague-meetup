import { debounce } from "debounce";

export const LOCAL_STORAGE_KEY = "polygonState";

enum GameState {
  NOT_STARTED = "notStarted",
  STARTED = "started",
  FINISHED = "finished",
}

export interface BlindMapState {
  toGuessList: string[];
  gameState: GameState;
  time: number;
  guesses: string[];
  current: number;
}

export enum BlindMapActionType {
  START = "start",
  FINISH = "finish",
  UPDATE_TIME = "updateTime",
  SELECT = "select",
  NEXT = "next",
}

export interface BlindMapAction {
  type: BlindMapActionType;
  payload?: any;
}

const blindMapReducer = (
  state: BlindMapState,
  action: BlindMapAction
): BlindMapState => {
  switch (action.type) {
    case BlindMapActionType.START:
      return {
        ...state,
        gameState: GameState.STARTED,
        time: 0,
        guesses: [],
        current: 0,
      };

    case BlindMapActionType.FINISH:
      return {
        ...state,
        gameState: GameState.FINISHED,
      };

    case BlindMapActionType.UPDATE_TIME:
      return {
        ...state,
        time: action.payload,
      };

    case BlindMapActionType.SELECT:
      return {
        ...state,
        guesses: [...state.guesses, action.payload],
      };

    case BlindMapActionType.NEXT:
      return {
        ...state,
        current: state.current + 1,
      };

    default:
      return state;
  }
};
