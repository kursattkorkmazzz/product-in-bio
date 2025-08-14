import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "../ui/sidebar";
import { SidebarMenuData } from "./sidebar-menu-data";
import ProfileMenu from "./profile-menu";

export default function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">Hepsify</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {Object.entries(SidebarMenuData).map(([group_name, items], i) => {
          return (
            <Collapsible
              key={group_name + i}
              title={group_name}
              className="group/sidebar-collapsible"
            >
              <SidebarGroup key={group_name}>
                <SidebarGroupLabel
                  className="group/sidebar-collapsible"
                  asChild
                >
                  <CollapsibleTrigger>
                    {group_name}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/sidebar-collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    {items.map((item) => (
                      <SidebarMenu>
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton>
                            {item.icon && <item.icon className="mr-2" />}
                            {item.label}
                          </SidebarMenuButton>
                          {item.badge && (
                            <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                          )}

                          {item.sidebarMenuItems &&
                            item.sidebarMenuItems.length > 0 && (
                              <SidebarMenuSub>
                                {item.sidebarMenuItems.map((subItem) => (
                                  <SidebarMenuItem key={subItem.label}>
                                    <SidebarMenuButton>
                                      {subItem.icon && (
                                        <subItem.icon className="mr-2" />
                                      )}
                                      {subItem.label}
                                    </SidebarMenuButton>
                                    {subItem.badge && (
                                      <SidebarMenuBadge>
                                        {subItem.badge}
                                      </SidebarMenuBadge>
                                    )}
                                  </SidebarMenuItem>
                                ))}
                              </SidebarMenuSub>
                            )}
                        </SidebarMenuItem>
                      </SidebarMenu>
                    ))}
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <ProfileMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
