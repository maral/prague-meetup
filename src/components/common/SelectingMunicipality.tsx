import { BlindMapActionType } from "@/state/blindMapState";
import { sortPragueDistricts } from "@/utils/data";
import { PanelButton } from "../ui/PanelButton";
import PanelH2 from "../ui/PanelH2";
import { PolygonIdName } from "@/types/types";

export interface SelectingMunicipalityProps {
  polygons: PolygonIdName[];
  onMunicipalitySelect: (id: string) => void;
}

export default function SelectingMunicipality({
  polygons,
  onMunicipalitySelect,
}: SelectingMunicipalityProps) {
  return (
    <>
      <PanelH2>Výběr městské části</PanelH2>
      <p>Vyber si, kam pojedeš na výlet.</p>
      <div className="mt-6 flex flex-col gap-4">
        {sortPragueDistricts(polygons).map((polygon) => (
          <PanelButton
            key={polygon.id}
            title={polygon.name}
            onClick={() => onMunicipalitySelect(polygon.id)}
          />
        ))}
      </div>
    </>
  );
}
