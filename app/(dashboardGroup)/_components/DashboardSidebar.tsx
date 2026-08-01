"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { ISidebarItem, NavbarProps } from "@/lib/type";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarMenuItems } from "../_config/sidebarMenuItems";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  const { isMobile, setOpenMobile } = useSidebar();

  let navItems: ISidebarItem[] = [];

  if (user?.data?.role === "CUSTOMER") {
    navItems = sidebarMenuItems.CUSTOMER;
  } else if (user?.data?.role === "TECHNICIAN") {
    navItems = sidebarMenuItems.TECHNICIAN;
  } else if (user?.data?.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  const dashboardHomePath =
    user?.data?.role === "CUSTOMER"
      ? "/dashboard"
      : user?.data?.role === "TECHNICIAN"
        ? "/technician-dashboard"
        : "/admin-dashboard";

  const isItemActive = (href: string) => {
    if (href === dashboardHomePath) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link
          href={dashboardHomePath}
          onClick={handleNavigation}
          className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-sidebar-accent"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold text-sidebar-foreground">
              FixItNow
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user?.data?.role ? `${user.data.role} Dashboard` : "Dashboard"}
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="min-h-0 overflow-y-auto">
        <SidebarGroup>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = isItemActive(item.href);

                return (
                  <SidebarMenuItem key={item.href} className="py-0.5">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-10 text-sm"
                    >
                      <Link href={item.href} onClick={handleNavigation}>
                        <item.icon className="size-4" />

                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-sidebar-accent p-3">
          <p className="truncate text-sm font-semibold text-sidebar-foreground">
            {user?.data?.name || "User"}
          </p>

          <p className="mt-1 truncate text-xs text-muted-foreground">
            {user?.data?.email || ""}
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
