"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { toast } from "sonner";
import { getErrorMessageFromCode } from "@/lib/better-auth/error-handling";
const ChangePasswordSchema = z4
  .object({
    currentPassword: z4.string().min(1, "Current password is required."),
    newPassword: z4
      .string()
      .min(8, "New password must be at least 8 characters."),
    confirmPassword: z4.string().min(8, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function ChangePasswordForm() {
  const changePasswordFormHook = useForm<z4.infer<typeof ChangePasswordSchema>>(
    {
      resolver: zodResolver(ChangePasswordSchema),
      defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      mode: "onChange",
    }
  );

  const isDirty = changePasswordFormHook.formState.isDirty;
  const isValid = changePasswordFormHook.formState.isValid;
  const isSubmitting = changePasswordFormHook.formState.isSubmitting;

  const changePasswordHandler = async (
    opts: z4.infer<typeof ChangePasswordSchema>
  ) => {
    const result = await betterAuthClient.changePassword({
      currentPassword: opts.currentPassword,
      newPassword: opts.newPassword,
      revokeOtherSessions: true,
    });

    if (result.error) {
      toast.error(getErrorMessageFromCode(result.error.code));
      changePasswordFormHook.reset();
      return;
    }

    if (result.data) {
      toast.success("Password changed successfully.");
      changePasswordFormHook.reset();
    } else {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <Form {...changePasswordFormHook}>
      <form
        className="flex flex-col gap-3"
        onSubmit={changePasswordFormHook.handleSubmit(changePasswordHandler)}
        onReset={() => {
          changePasswordFormHook.reset();
        }}
        method="post"
      >
        <FormField
          control={changePasswordFormHook.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your current password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={changePasswordFormHook.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={changePasswordFormHook.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your new password"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <motion.div className="flex gap-2 items-center justify-end w-full min-h-0">
          <Button
            type="reset"
            variant={"destructive"}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant={"default"}
            isSaving={isSubmitting}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            Save Changes
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
