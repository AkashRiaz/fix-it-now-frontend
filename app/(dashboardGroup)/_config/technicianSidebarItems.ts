
import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard } from "lucide-react";

export const TECHNICIAN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label: "Dashboard",
        href: "/technician-dashboard",
        icon: LayoutDashboard
    },
    {
        label: "My Posts",
        href: "/technician-dashboard/my-posts",
        icon: FileText
    },
]