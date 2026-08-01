import { Suspense } from "react";
import BookingTableSkeleton from "../_components/booking/BookingTableSkeleton";
import CustomerBookings from "../_components/booking/CustomerBookings";

const BookingsPage = () => {
  return (
    <Suspense fallback={<BookingTableSkeleton />}>
      <CustomerBookings />
    </Suspense>
  );
};

export default BookingsPage;
