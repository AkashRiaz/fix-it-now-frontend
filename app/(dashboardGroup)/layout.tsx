import { Navbar } from "@/components/shared/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardGroupLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await getMe();

  return (
    <div
      className="
        flex
        h-screen
        flex-col
        overflow-hidden
      "
    >
      {/* Navbar */}
      <Navbar user={user} />

      {/* Dashboard Area */}
      <SidebarProvider
        className="
          flex-1
          overflow-hidden
        "
      >
        <div
          className="
            flex
            flex-1
            overflow-hidden
          "
        >
          {/* Sidebar */}
          <DashboardSidebar user={user} />

          {/* Main Content */}
          <main
            className="
              flex-1
              min-w-0
              overflow-y-auto
              bg-background
            "
          >
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardGroupLayout;
