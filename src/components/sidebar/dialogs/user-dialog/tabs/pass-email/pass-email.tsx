import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { motion } from "motion/react";
import ChangePasswordForm from "./forms/change-password-form";
import UpdateEmail from "./forms/update-email-form";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export default function PassEmail() {
  const isMobile = useIsMobile();
  const changeEmailDisabled: boolean = true; // This should be replaced with actual logic to determine if the change email feature is disabled.
  return (
    <motion.div
      className="flex flex-col gap-4 px-2 justify-start w-full md:min-w-lg"
      layout="position"
      style={{
        transformOrigin: "top",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>

      {!changeEmailDisabled && (
        <Card>
          <CardHeader>
            <CardTitle>Change Email</CardTitle>
            <CardDescription>Update your email.</CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateEmail />
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
