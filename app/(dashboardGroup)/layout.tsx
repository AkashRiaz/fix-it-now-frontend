import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardMainContent from "./_components/DashboardMainContent";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar user={user} />

      <SidebarProvider className="min-h-0 flex-1 overflow-hidden">
        <div className="flex h-full min-h-0 w-full overflow-hidden">
          <DashboardSidebar user={user} />

          <DashboardMainContent>
            {children}
          </DashboardMainContent>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardGroupLayout;