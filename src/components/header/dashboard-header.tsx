import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-3 p-2">
        <SidebarTrigger className="p-5" />
        <Separator orientation="vertical" />
      </div>
      <Separator />
    </div>
  );
}
