import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import generateNameFallback from "@/utils/name-fallback-generator";
import { RectangleEllipsis, UserRound } from "lucide-react";

export default function SidebarUserDialog() {
  return (
    <>
      <DialogTitle>Account Settings</DialogTitle>
      <Tabs orientation="vertical" defaultValue="general-settings">
        <TabsList className="gap-2">
          <TabsTrigger value="general-settings">
            <UserRound />
            General Settings
          </TabsTrigger>
          <TabsTrigger value="privacy-settings">
            <RectangleEllipsis />
            Password & Email
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general-settings">TESTINGG</TabsContent>
        <TabsContent value="privacy-settings">PRIVACY</TabsContent>
      </Tabs>
    </>
  );
}
