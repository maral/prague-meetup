import { debounce } from "debounce";

export const LOCAL_STORAGE_KEY = "polygonState";

export const idsArrayToState = (
  ids: string[],
  valueFunction: (id: string) => boolean
): PolygonState => {
  return ids.reduce((accumulator: PolygonState, id) => {
    accumulator[id] = valueFunction(id);
    return accumulator;
  }, {});
};

export interface PolygonState {
  [id: string]: boolean;
}

export enum PolygonActionType {
  TOGGLE = "toggle",
  INITIALIZE = "initialize",
  SELECT_ALL = "selectAll",
  UNSELECT_ALL = "unselectAll",
}

export interface PolygonAction {
  type: PolygonActionType;
  payload: { ids: string[] };
}

type PolygonReducer = (
  state: PolygonState,
  action: PolygonAction
) => PolygonState;

export const getStoredState = (): PolygonState | null => {
  const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (storedState) {
    return JSON.parse(storedState);
  }

  return null;
};

const debouncedSaveToLocalStorage = debounce((state: PolygonState) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}, 1000);

const saveTolocalStorage = (reducer: PolygonReducer): PolygonReducer => {
  return (state, action) => {
    const newState = reducer(state, action);
    if (action.type !== PolygonActionType.INITIALIZE) {
      debouncedSaveToLocalStorage(newState);
    }
    return newState;
  };
};

export const municipalityPolygonReducer = saveTolocalStorage(
  (state: PolygonState, action: PolygonAction): PolygonState => {
    switch (action.type) {
      case PolygonActionType.UNSELECT_ALL: {
        return {
          ...state,
          ...idsArrayToState(action.payload.ids, (id) => false),
        };
      }
      case PolygonActionType.INITIALIZE:
      case PolygonActionType.SELECT_ALL: {
        return {
          ...state,
          ...idsArrayToState(action.payload.ids, (id) => true),
        };
      }
      case PolygonActionType.TOGGLE: {
        return {
          ...state,
          ...idsArrayToState(action.payload.ids, (id) => !state[id]),
        };
      }
    }
  }
);
