import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RectangleEllipsis, UserRound } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import Profile from "./tabs/profile/profile";
import PassEmail from "./tabs/pass-email/pass-email";
import { useState } from "react";

export default function SidebarUserDialog() {
  const [tab, setTab] = useState("general-settings");

  const isMobile = useIsMobile();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Account Settings</DialogTitle>
      </DialogHeader>
      <Tabs
        defaultValue="general-settings"
        orientation="horizontal"
        tab={tab}
        setTab={setTab}
        value={tab}
      >
        <TabsList className="gap-2 bg-muted">
          <TabsTrigger value="general-settings">
            <UserRound size={18} />
            Profile
          </TabsTrigger>
          <TabsTrigger value="privacy-settings">
            <RectangleEllipsis size={18} />
            Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general-settings">
          <Profile />
        </TabsContent>
        <TabsContent value="privacy-settings">
          <PassEmail />
        </TabsContent>
      </Tabs>
    </>
  );
}
