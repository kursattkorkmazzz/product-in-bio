"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import generateNameFallback from "@/utils/name-fallback-generator";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SidebarUserDialog from "./dialogs/user-dialog/sidebar-user-dialog";
import { useTabs } from "../ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SidebarUser() {
  const { data, error, isPending } = betterAuthClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const logoutHandler = () => {
    betterAuthClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // Handle successful logout
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError: (error) => {
          // Handle logout error
          toast.error(getErrorMessage(error.error));
        },
      },
    });
  };

  return (
    <Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          {!isPending && data ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.image || ""}
                        alt={data.user.name}
                      />

                      <AvatarFallback className="rounded-lg">
                        {generateNameFallback(data.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {data.user.name}
                      </span>
                      <span className="truncate text-xs">
                        {data.user.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  side={"right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.image || ""}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {generateNameFallback(data.user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {data.user.name}
                        </span>
                        <span className="truncate text-xs">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DialogTrigger className="w-full">
                      <DropdownMenuItem>
                        <BadgeCheck />
                        Account
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logoutHandler}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Skeleton className="w-full h-12" />
          )}
        </SidebarMenuItem>
      </SidebarMenu>

      <DialogContent className="gap-2">
        <SidebarUserDialog />
      </DialogContent>
    </Dialog>
  );
}
