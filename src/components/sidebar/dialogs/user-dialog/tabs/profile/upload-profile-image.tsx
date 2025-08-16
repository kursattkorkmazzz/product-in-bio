import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UploadInput from "@/components/ui/upload-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";
import { AnimatePresence, motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import Loading from "@/components/ui/loading";
import axios from "axios";
import { uploadImage } from "@/actions/upload-image";
import { useRouter } from "next/navigation";
import { session } from "@/database/schemas/session";

const UploadProfileDTO = z4.object({
  image: z4.url("Invalid image URL").optional(),
});

export default function UploadProfileImage() {
  const [isLoading, setIsLoading] = useState(false);
  const { data, refetch } = betterAuthClient.useSession();
  const router = useRouter();
  const formHook = useForm<z4.infer<typeof UploadProfileDTO>>({
    resolver: zodResolver(UploadProfileDTO),
    defaultValues: {
      image: data?.user?.image || undefined,
    },
    mode: "onChange",
  });

  const urlSubmitHandler = (data: z4.infer<typeof UploadProfileDTO>) => {
    setIsLoading(true);
    betterAuthClient.updateUser({
      image: data.image,
      fetchOptions: {
        onSuccess() {
          setIsLoading(false);
          formHook.reset({
            image: data.image,
          });
          toast.success("Profile image updated successfully.");
        },

        onError(context) {
          setIsLoading(false);
          formHook.reset({
            image: data.image,
          });
          toast.error(getErrorMessage(context.error));
        },
      },
    });
  };

  const onFileupload = (formData: FormData) => {
    if (!data?.user) return;
    formData.append("userId", data.user.id);
    setIsLoading(true);
    uploadImage(formData)
      .then((response) => {
        formHook.reset({
          image: data.user.image || undefined,
        });

        betterAuthClient.getSession({
          fetchOptions: {
            onSuccess(context) {
              setIsLoading(false);
              toast.success("Profile image uploaded successfully.");
              refetch();
              router.refresh();
            },
          },
        });
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full ">
      <div className="w-full flex items-center justify-center">
        <form className="w-full" action={onFileupload}>
          <UploadInput
            className="w-full py-12"
            accept={["image/png", "image/jpeg", "image/jpg"]}
            maxFileSize={5 * 1024 * 1024}
            disabled={isLoading}
            autoSubmit
          >
            <UploadIcon className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Upload Picture
            </span>
          </UploadInput>
        </form>
      </div>

      <div className="flex w-full gap-2 items-center justify-between my-2">
        <Separator className="shrink " decorative />
        <p className="text-sm text-muted-foreground">or</p>
        <Separator className="shrink " decorative />
      </div>

      <Form {...formHook}>
        <form
          method="post"
          onSubmit={formHook.handleSubmit(urlSubmitHandler)}
          className="flex items-center gap-2 w-full "
        >
          <FormField
            control={formHook.control}
            name="image"
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <motion.div className="w-full flex items-center gap-2">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter image URL"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      variant={"default"}
                      disabled={
                        isLoading ||
                        !formHook.formState.isValid ||
                        !formHook.formState.isDirty
                      }
                    >
                      {isLoading ? (
                        <>
                          <Loading size={12} />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </motion.div>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </div>
  );
}
