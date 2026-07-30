import React from "react";
import { getBookingsAction } from "../_actions/bookingActions";
import BookingTable from "../_components/booking/bookingTable";

const CustomerBookings = async () => {
  const result = await getBookingsAction();
  return (
    <div className="container mx-auto px-4 py-2 md:max-w-7xl">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <BookingTable data={result.data} />
    </div>
  );
};

export default CustomerBookings;
