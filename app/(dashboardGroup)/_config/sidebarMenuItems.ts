import { FileText, LayoutDashboard, CreditCard } from "lucide-react";
import { ISidebarItem } from "@/lib/type";
import { TECHNICIAN_SIDEBAR_ITEMS } from "./technicianSidebarItems";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings",
    icon: FileText,
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  TECHNICIAN: TECHNICIAN_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
