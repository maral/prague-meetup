export enum RouletteGameState {
  NotStarted,
  Started,
  Finished,
}

export interface RouletteState {
  gameState: RouletteGameState;
  currentId?: string;
}

export enum RouletteActionType {
  START = "start",
  FINISH = "finish",
  NEXT = "next",
  RESTART = "restart",
}

export interface RouletteAction {
  type: RouletteActionType;
  payload?: any;
}

export const rouletteReducer = (
  state: RouletteState,
  action: RouletteAction
): RouletteState => {
  switch (action.type) {
    case RouletteActionType.START:
      return {
        ...state,
        gameState: RouletteGameState.Started,
      };

    case RouletteActionType.NEXT:
      return {
        ...state,
        currentId: action.payload,
      };

    case RouletteActionType.FINISH:
      return {
        ...state,
        gameState: RouletteGameState.Finished,
      };

    case RouletteActionType.RESTART:
      return {
        ...state,
        gameState: RouletteGameState.NotStarted,
        currentId: undefined,
      };

    default:
      return state;
  }
};
