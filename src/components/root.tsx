"use client";

import { MySidebar, SidebarContext } from "@/components/sidebar";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function RootPage({ children }: { children: React.ReactNode }) {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <SidebarContext.Provider value={{ openSideBar, setOpenSideBar }}>
      <div className="p-2 md:p-4 flex min-h-screen h-screen overflow-hidden">
        <MySidebar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        <div
          className={cn(
            "bg-background w-full rounded-2xl p-6 border border-gray-200 flex flex-col",
            "transition-transform duration-300 ease-in-out",
            openSideBar ? "translate-x-[270px]" : "translate-x-0",
            "md:translate-x-0"
          )}
        >
          <div className="max-w-[1200px] mx-auto w-full">
            <div className="flex flex-row items-center gap-2 mb-4 mt-1 -mx-3 md:mb-6 md:mt-2 md:mx-0">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 md:hidden"
                onClick={() => setOpenSideBar(!openSideBar)}
              >
                <Menu className="w-3 h-3" />
              </Button>
              <BreadcrumbNav />
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)] rounded-b-lg min-w-[300px]">
              {children}
            </ScrollArea>
          </div>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
