import { TechnicianFilterSheet } from "./TechnicianFilterSheet";
import { TechnicianSearchBar } from "./TechnicianSearchBar";
import { TechnicianSort } from "./TechnicianSort";

export function TechnicianToolbar() {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <TechnicianSearchBar />
        </div>

        <div className="grid w-full grid-cols-2 gap-2 lg:flex lg:w-auto lg:items-center">
          <div className="min-w-0">
            <TechnicianSort />
          </div>

          <div className="min-w-0">
            <TechnicianFilterSheet />
          </div>
        </div>
      </div>
    </div>
  );
}
