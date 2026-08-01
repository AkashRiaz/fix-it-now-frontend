import { ISidebarItem } from "@/lib/type";
import {
  UsersRound,
  LayoutDashboard,
  FolderKanban,
  CalendarCheck2,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Category Management",
    href: "/admin-dashboard/categories",
    icon: FolderKanban,
  },
  {
    label: "User Management",
    href: "/admin-dashboard/user-management",
    icon: UsersRound,
  },
  {
    label: "Bookings",
    href: "/admin-dashboard/bookings",
    icon: CalendarCheck2,
  },
];
