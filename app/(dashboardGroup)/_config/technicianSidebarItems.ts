import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard, User,Wrench } from "lucide-react";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/technician-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Bookings",
    href: "/technician-dashboard/technician/bookings",
    icon: FileText,
  },
  {
    label: "Services",
    href: "/technician-dashboard/services",
    icon: Wrench,
  },

  {
    label: "Profile",
    href: "/technician-dashboard/profile",
    icon: User,
  },
];
