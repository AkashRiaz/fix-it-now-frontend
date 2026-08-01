
import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard, FolderKanban  } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/admin-dashboard",
        icon : LayoutDashboard
    },
    {
        label : "Category Management",
        href : "/admin-dashboard/categories",
        icon : FolderKanban
    },
]