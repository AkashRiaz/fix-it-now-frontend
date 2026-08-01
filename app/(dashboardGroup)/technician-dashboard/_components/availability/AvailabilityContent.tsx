import { AlertCircle } from "lucide-react";
import WeeklyAvailabilityForm from "./WeeklyAvailabilityForm";
import { getTechnicianAvailabilityAction } from "../../_actions/technicianAvailabilityActions";

const AvailabilityContent = async () => {
  const result = await getTechnicianAvailabilityAction();

  if (!result?.success) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

        <h2 className="mt-3 font-semibold text-red-800">
          Unable to load availability
        </h2>

        <p className="mt-1 text-sm text-red-600">
          {result?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  return <WeeklyAvailabilityForm initialAvailability={result?.data ?? []} />;
};

export default AvailabilityContent;
