import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { getErrorMessageFromCode } from "@/lib/better-auth/error-handling";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z4 from "zod/v4";

const UpdateEmailSchema = z4.object({
  newEmail: z4.string().email("Invalid email address."),
});

export default function UpdateEmailForm() {
  const { data, refetch } = betterAuthClient.useSession();

  const formHook = useForm<z4.infer<typeof UpdateEmailSchema>>({
    resolver: zodResolver(UpdateEmailSchema),
    defaultValues: {
      newEmail: data?.user?.email || "",
    },
    mode: "onChange",
  });

  const isValid = formHook.formState.isValid;
  const isDirty = formHook.formState.isDirty;
  const isSubmitting = formHook.formState.isSubmitting;

  const updateEmailHandler = async (
    opts: z4.infer<typeof UpdateEmailSchema>
  ) => {
    const result = await betterAuthClient.changeEmail({
      newEmail: opts.newEmail,
    });

    if (result.error) {
      toast.error(getErrorMessageFromCode(result.error.code));
      resetHandler();
      return;
    }
    refetch();
    formHook.reset({
      newEmail: opts.newEmail,
    });
    toast.success("Email updated successfully.");
  };

  const resetHandler = () => {
    formHook.reset({
      newEmail: data?.user?.email || "",
    });
  };

  return (
    <Form {...formHook}>
      <form
        method="post"
        onSubmit={formHook.handleSubmit(updateEmailHandler)}
        onReset={resetHandler}
      >
        <FormField
          control={formHook.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <Button
            type="submit"
            isSaving={isSubmitting}
            disabled={!isValid || !isDirty || isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
