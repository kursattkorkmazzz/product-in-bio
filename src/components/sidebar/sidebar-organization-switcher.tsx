import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "../ui/sidebar";

export default function SidebarOrganizationSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SidebarMenuButton>Select Project</SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            className="py-2 px-3"
          >
            <DropdownMenuLabel className="text-card-foreground text-xs">
              Projects
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem>Project 1</DropdownMenuItem>
            <DropdownMenuItem>Project 2</DropdownMenuItem>
            <DropdownMenuItem>Project 3</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
