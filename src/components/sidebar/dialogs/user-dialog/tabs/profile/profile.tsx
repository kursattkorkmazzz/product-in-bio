import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Loading from "@/components/ui/loading";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import generateNameFallback from "@/utils/name-fallback-generator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, UploadIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z4 from "zod/v4";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "@/components/ui/separator";
import UploadInput from "@/components/ui/upload-input";
import UploadProfileImage from "./upload-profile-image";
import { useTabs } from "@/components/ui/tabs";

const UpdateAccountSettingsSchema = z4.object({
  name: z4.string().min(1, "Name is required.").optional(),
});

export default function Profile(props: {
  onChangePasswordClick?: () => void;
  onChangeEmailClick?: () => void;
}) {
  const {
    data: session,
    error,
    isPending,
    refetch,
  } = betterAuthClient.useSession();
  if (isPending) {
    return <Loading />;
  }
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const formHook = useForm<z4.infer<typeof UpdateAccountSettingsSchema>>({
    resolver: zodResolver(UpdateAccountSettingsSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
    disabled: isPending,
  });

  const isAuthenticated = useMemo(() => {
    return () => {
      if (!session) {
        toast.error("Session not found. Please log in again.");
        router.push("/login");
      }
    };
  }, [session, router]);

  const onSubmit = (data: z4.infer<typeof UpdateAccountSettingsSchema>) => {
    setIsloading(true);
    isAuthenticated();
    betterAuthClient.updateUser({
      name: data.name,
      fetchOptions: {
        onSuccess(context) {
          toast.success("Account settings updated successfully.");
          formHook.reset();
          setIsloading(false);
        },

        onError(context) {
          toast.error(getErrorMessage(context.error));
          formHook.reset();
          setIsloading(false);
        },
      },
    });
  };

  const onReset = () => {
    formHook.reset();
  };

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
      formHook.reset();
    }
  }, [error]);

  useEffect(() => {
    if (session?.user) {
      formHook.reset({
        name: session.user.name || "",
      });
    }
  }, [session]);
  return (
    <motion.div
      className="flex flex-col w-full gap-4 px-2 items-center justify-start md:min-w-lg"
      layout="position"
      style={{
        transformOrigin: "top",
      }}
    >
      <motion.div
        layout="position"
        whileHover={{ scale: 1.05 }}
        className="rounded-md overflow-hidden relative group cursor-pointer"
      >
        <Dialog>
          <Avatar className="rounded-md size-36 cursor-pointer">
            <AvatarImage
              className="rounded-md"
              src={session?.user.image || ""}
            />
            <AvatarFallback className="rounded-md text-6xl text-muted-foreground bg-muted">
              {generateNameFallback(session?.user.name || "")}
            </AvatarFallback>
            <DialogTrigger>
              <div
                className={cn(
                  "z-5 absolute w-full h-full  top-0 left-0 flex items-center justify-center bg-muted",
                  "group-hover:opacity-80 opacity-0 transition-opacity duration-300 cursor-pointer"
                )}
              >
                <Camera size={36} className="text-muted-foreground" />
              </div>
            </DialogTrigger>
          </Avatar>

          <DialogContent className="w-min min-w-lg">
            <DialogHeader>
              <DialogTitle>Change Profile Picture</DialogTitle>
              <DialogDescription>
                You can change profile image by uploading a new one or entering
                picture url.
              </DialogDescription>
            </DialogHeader>
            <UploadProfileImage />
          </DialogContent>
        </Dialog>
      </motion.div>

      <Form {...formHook}>
        <form
          className="w-full"
          onSubmit={formHook.handleSubmit(onSubmit)}
          onReset={onReset}
          method="post"
        >
          <FormField
            control={formHook.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>

                  <div className=" flex flex-row gap-2 items-center justify-start">
                    <FormControl>
                      <Input type="text" autoComplete="name" {...field} />
                    </FormControl>

                    {formHook.formState.dirtyFields.name && (
                      <Button
                        variant={"ghost"}
                        size="icon"
                        type="button"
                        onClick={() => {
                          formHook.resetField("name");
                        }}
                      >
                        <X size={3} />
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <motion.div
            className="overflow-hidden flex gap-1 justify-end mt-4"
            style={{
              transformOrigin: "top",
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: (formHook.formState.isDirty && 36) || 0,
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Button
              type="reset"
              variant={"destructive"}
              size={"sm"}
              disabled={!formHook.formState.isDirty || isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"default"}
              size={"sm"}
              disabled={!formHook.formState.isDirty || isLoading}
            >
              {isLoading ? (
                <>
                  <Loading className="w-min h-min" size={12} />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}
