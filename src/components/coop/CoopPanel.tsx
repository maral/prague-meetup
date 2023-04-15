import { PolygonData } from "@/types/types";
import { Dispatch, useMemo } from "react";
import PolygonCheckbox from "@/components/coop/PolygonCheckbox";
import {
  PolygonAction,
  PolygonActionType,
  PolygonState,
} from "@/state/coopState";
import Separator from "../ui/Separator";

interface PanelProps {
  data: PolygonData[];
  state: PolygonState;
  dispatch: Dispatch<PolygonAction>;
}

export default function CoopPanel({ state, data, dispatch }: PanelProps) {
  const checked = Object.values(state).filter((value) => value).length;
  const allIds = useMemo(() => data.map((polygon) => polygon.id), [data]);
  const allSelected = checked - data.length === 0;

  return (
    <>
      <div>
        Vybráno: {checked} / {data.length}
      </div>
      <ul className="mt-4 grid grid-cols-2 md:grid-cols-1">
        <li key={0} className="col-span-2 md:col-span-1">
          <PolygonCheckbox
            name={allSelected ? "Odznačit vše" : "Vybrat vše"}
            checked={allSelected}
            onChange={() =>
              dispatch({
                type: allSelected
                  ? PolygonActionType.UNSELECT_ALL
                  : PolygonActionType.SELECT_ALL,
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
              checked={state[polygon.id]}
              onChange={() =>
                dispatch({
                  type: PolygonActionType.TOGGLE,
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
