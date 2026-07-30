import { getTechnicianAction } from "../../_actions/technicianActions";
import { TechnicianHero } from "../../_components/technicians/TechnicianHero";
import { TechnicianServices } from "../../_components/technicians/TechnicianServices";

export default async function TechnicianPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const result = await getTechnicianAction(id);

  if (!result.success) {
    return <p>Technician not found</p>;
  }

  const technician = result.data;

  return (
    <main
      className="container mx-auto px-4 py-10 md:max-w-7xl"
    >
      <TechnicianHero technician={technician} />

      <div className="mt-10">
        <TechnicianServices
          services={technician.services}
          technician={technician}
        />
      </div>
    </main>
  );
}
