import { TechnicianFilterSheet } from "./TechnicianFilterSheet";
import { TechnicianSearchBar } from "./TechnicianSearchBar";
import { TechnicianSort } from "./TechnicianSort";

export function TechnicianToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <TechnicianSearchBar />

      <div className="flex items-center gap-2">
        <div className="flex-1 sm:flex-none">
          <TechnicianSort />
        </div>

        <TechnicianFilterSheet />
      </div>
    </div>
  );
}
