import { getMe } from "@/service/getMe";
import TechnicianProfileIndex from "../_components/TechnicianProfileIndex";

const TechnicianProfilePage = async () => {
  const technician = await getMe();

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <TechnicianProfileIndex profileData={technician} />
    </div>
  );
};

export default TechnicianProfilePage;
