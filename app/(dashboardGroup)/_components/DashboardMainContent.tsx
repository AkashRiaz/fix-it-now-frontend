"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";

interface DashboardMainContentProps {
  children: ReactNode;
}

const DashboardMainContent = ({ children }: DashboardMainContentProps) => {
  const pathname = usePathname();
  const mainReference = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainReference.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <main
      ref={mainReference}
      className="
        min-w-0
        flex-1
        overflow-y-auto
        bg-background
      "
    >
      {children}
    </main>
  );
};

export default DashboardMainContent;
