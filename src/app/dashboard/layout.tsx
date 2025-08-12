import AppSidebar from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-sidebar h-full">
      <AppSidebar />
      <SidebarInset className="m-3 rounded-xl bg-background">
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
