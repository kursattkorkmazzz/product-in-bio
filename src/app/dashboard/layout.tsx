"use client";
import DashboardHeader from "@/components/header/dashboard-header";
import AppSidebar from "@/components/sidebar/app-sidebar";
import Loading from "@/components/ui/loading";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { data: session, isPending } = betterAuthClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login");
      }
    }
  }, [session, isPending, router]);

  // Session yüklenene kadar loading göster
  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading size={28} />
      </div>
    );
  }

  // Session yoksa hiçbir şey render etme (redirect edilecek)
  if (!session) {
    return null;
  }

  return (
    <SidebarProvider className="bg-sidebar h-full">
      <AppSidebar />
      <SidebarInset className="flex flex-col m-3 rounded-xl bg-background">
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
