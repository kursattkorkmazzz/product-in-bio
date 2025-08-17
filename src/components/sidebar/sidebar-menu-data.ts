import { LucideIcon, PaintbrushIcon, PaletteIcon, User } from "lucide-react";

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
  "Layout & Styling": [
    {
      id: "link-editor",
      label: "Links",
      icon: PaintbrushIcon,
      href: "/dashboard/link-editor",
    },
    {
      id: "style-layout",
      label: "Styling",
      icon: PaletteIcon,
      href: "/dashboard/layout-styling",
    },
  ],
};
