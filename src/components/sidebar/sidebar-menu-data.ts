import { LucideIcon, User } from "lucide-react";

type SidebarMenuData = {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  sidebarMenuItems?: SidebarMenuData[];
};

// keys wil be used as sidebar menu group names
// values will be used as sidebar menu items
// sidebarMenuItems will be used as nested sidebar menu items
export const SidebarMenuData: Record<string, SidebarMenuData[]> = {
  "Organization Management": [
    {
      id: "orgs",
      label: "Users",
      icon: User,
      href: "/users",
      badge: "2",
      sidebarMenuItems: [
        {
          id: "user1",
          label: "User 1",
          icon: User,
          href: "/users/user1",
        },
        {
          id: "user2",
          label: "User 2",
          icon: User,
          href: "/users/user2",
        },
      ],
    },
  ],
};
