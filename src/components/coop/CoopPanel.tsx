import { PolygonData } from "@/types/types";
import { Dispatch, useMemo } from "react";
import PolygonCheckbox from "@/components/coop/PolygonCheckbox";
import { CoopAction, CoopActionType, CoopState } from "@/state/coopState";
import Separator from "../ui/Separator";

interface PanelProps {
  data: PolygonData[];
  state: CoopState;
  dispatch: Dispatch<CoopAction>;
}

export default function CoopPanel({ state, data, dispatch }: PanelProps) {
  const unchecked = Object.values(state.selection).filter(
    (value) => !value
  ).length;
  const allIds = useMemo(() => data.map((polygon) => polygon.id), [data]);
  const allSelected = unchecked === 0;

  return (
    <>
      <div>
        Zbývá: {unchecked} / {data.length}
      </div>
      <ul className="mt-4 grid grid-cols-2 md:grid-cols-1">
        <li key={0} className="col-span-2 md:col-span-1">
          <PolygonCheckbox
            name={allSelected ? "Odznačit vše" : "Vybrat vše"}
            checked={allSelected}
            onChange={() =>
              dispatch({
                type: allSelected
                  ? CoopActionType.UNSELECT_ALL
                  : CoopActionType.SELECT_ALL,
                payload: { ids: allIds },
              })
            }
          />
        </li>
        <Separator />
        {data.map((polygon) => (
          <li key={polygon.id}>
            <PolygonCheckbox
              name={polygon.name}
              checked={state.selection[polygon.id]}
              onChange={() =>
                dispatch({
                  type: CoopActionType.TOGGLE,
                  payload: { ids: [polygon.id] },
                })
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
