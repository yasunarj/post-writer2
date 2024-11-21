import MainNav from "@/components/main-nav";
import { ReactNode } from "react";
import SiteFooter from "@/components/site-footer";
import { dashboardConfig } from "@/config/dashboard";
import DashboardNav from "@/components/dashboard-nav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex items-center justify-between py-6">
          <MainNav items={dashboardConfig.mainNav} />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr]">
        <aside className="hidden md:flex flex-col">
          <DashboardNav items={dashboardConfig.sidebarNav}/>
        </aside>
        <main className="flex flex-col w-full flex-1 overflow-hidden">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
};

export default DashboardLayout;
