"use server";
import React from "react";
import TechnicianBookingTable from "../../_components/TechnicianBookingTable";
import { getTechnicianBookingsAction } from "../../_actions/technicianBookingActions";

const TechnicianBookingPage = async () => {
  const result = await getTechnicianBookingsAction();

  return (
    <div className="container mx-auto px-4 py-2 md:max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <TechnicianBookingTable
        data={result.data}
      />
    </div>
  );
};

export default TechnicianBookingPage;
