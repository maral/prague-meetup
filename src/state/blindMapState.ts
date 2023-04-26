export enum GameState {
  NotStarted = "notStarted",
  Started = "started",
  Paused = "paused",
  Finished = "finished",
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
        time: 0,
        toGuessList: action.payload,
        guesses: [],
        current: 0,
      };

    case BlindMapActionType.FINISH:
      return {
        ...state,
        gameState: GameState.Finished,
      };

    case BlindMapActionType.UPDATE_TIME:
      return {
        ...state,
        time: action.payload,
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

    default:
      return state;
  }
};
