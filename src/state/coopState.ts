import { TipReason } from "@/types/tips";
import debounce from "lodash/debounce";
import intersection from "lodash/intersection";
import sample from "lodash/sample";

export const LOCAL_STORAGE_KEY = "polygonState";

export enum CoopGameState {
  Started = "started",
  Finished = "finished",
  SelectingMunicipality = "selectingMunicipality",
  ShowTips = "showTips",
}

export interface CoopState {
  gameState: CoopGameState;
  selection: CoopSelection;
  reason?: TipReason;
  tipId?: string;
}

export interface CoopSelection {
  [id: string]: boolean;
}

export enum CoopActionType {
  TOGGLE = "toggle",
  INITIALIZE = "initialize",
  SELECT_ALL = "selectAll",
  UNSELECT_ALL = "unselectAll",
  FINISH = "finish",
  MANUALLY_SELECT = "manually-select",
  RANDOMLY_SELECT = "randomly-select",
  SELECT_MUNICIPALITY = "select-municipality",
  RESTART_CLEAN = "restart-clean",
  RESTART_PREVIOUS = "restart-previous",
}

export interface CoopAction {
  type: CoopActionType;
  payload?: any;
}

type PolygonReducer = (state: CoopState, action: CoopAction) => CoopState;

export const getStoredState = (): CoopSelection | null => {
  const storedSelection = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedSelection) {
    return JSON.parse(storedSelection);
  }

  return null;
};

const debouncedSaveToLocalStorage = debounce((state: CoopState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.selection));
}, 1000);

const saveTolocalStorage = (reducer: PolygonReducer): PolygonReducer => {
  return (state, action) => {
    const newState = reducer(state, action);
    if (action.type !== CoopActionType.INITIALIZE) {
      debouncedSaveToLocalStorage(newState);
    }
    return newState;
  };
};

export const municipalityPolygonReducer = saveTolocalStorage(
  (state: CoopState, action: CoopAction): CoopState => {
    switch (action.type) {
      case CoopActionType.UNSELECT_ALL: {
        return {
          ...state,
          selection: {
            ...state.selection,
            ...idsArrayToSelection(action.payload.ids, (id) => false),
          },
        };
      }
      case CoopActionType.INITIALIZE:
      case CoopActionType.SELECT_ALL: {
        return {
          ...state,
          selection: {
            ...state.selection,
            ...idsArrayToSelection(action.payload.ids, (id) => true),
          },
        };
      }
      case CoopActionType.FINISH: {
        const unchecked = getUnchecked(state.selection);
        if (unchecked.length > 1) {
          return {
            ...state,
            gameState: CoopGameState.Finished,
          };
        } else if (unchecked.length === 1) {
          return {
            ...state,
            gameState: CoopGameState.ShowTips,
            reason: TipReason.OnlyOption,
            tipId: unchecked[0],
          };
        } else {
          return { ...state };
        }
      }
      case CoopActionType.TOGGLE: {
        return {
          ...state,
          selection: {
            ...state.selection,
            ...idsArrayToSelection(
              action.payload.ids,
              (id) => !state.selection[id]
            ),
          },
        };
      }
      case CoopActionType.MANUALLY_SELECT: {
        return {
          ...state,
          gameState: CoopGameState.SelectingMunicipality,
        };
      }

      case CoopActionType.SELECT_MUNICIPALITY: {
        return {
          ...state,
          gameState: CoopGameState.ShowTips,
          reason: TipReason.UserSelected,
          tipId: action.payload,
        };
      }

      case CoopActionType.RANDOMLY_SELECT: {
        return {
          ...state,
          gameState: CoopGameState.ShowTips,
          reason: TipReason.RandomlySelected,
          tipId: sample(getUnchecked(state.selection)),
        };
      }

      case CoopActionType.RESTART_CLEAN:
      case CoopActionType.RESTART_PREVIOUS: {
        return {
          ...state,
          gameState: CoopGameState.Started,
          selection:
            action.type === CoopActionType.RESTART_PREVIOUS
              ? state.selection
              : idsArrayToSelection(Object.keys(state.selection), () => {
                  return false;
                }),
          tipId: undefined,
          reason: undefined,
        };
      }
    }
  }
);

export const getUnchecked = (selection: CoopSelection): string[] => {
  return Object.keys(selection).filter((id) => !selection[id]);
};

export const getUncheckedCount = (selection: CoopSelection): number => {
  return getUnchecked(selection).length;
};

export const idsArrayToSelection = (
  ids: string[],
  valueFunction: (id: string) => boolean
): CoopSelection => {
  return ids.reduce((accumulator: CoopSelection, id) => {
    accumulator[id] = valueFunction(id);
    return accumulator;
  }, {});
};
