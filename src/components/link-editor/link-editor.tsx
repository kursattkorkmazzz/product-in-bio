"use client";
import { betterAuthClient } from "@/lib/better-auth/auth-client";
import { getErrorMessage } from "@/lib/better-auth/error-handling";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import generateNameFallback from "@/utils/name-fallback-generator";
import { Plus, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function LinkEditor() {
  const { data, error, isPending, refetch } = betterAuthClient.useSession();
  const router = useRouter();

  // Authentication Check
  useEffect(() => {
    if (isPending) return;
    if (!data) {
      toast.error("You must be logged in to access the link editor.");
      router.push("/login");
      return;
    }
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [isPending]);

  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={data?.user.image || ""} />
            <AvatarFallback>
              {generateNameFallback(data?.user.name || "")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start">
            <h2 className="font-semibold cursor-pointer hover:underline">
              {data?.user.name}
            </h2>
            <p className="text-sm cursor-pointer hover:underline">
              Lorem ipsum dolar sit amet.
            </p>
            <div className="flex gap-2 items-center">
              <p>I</p>
              <p>F</p>
              <Button
                variant={"outline"}
                size="icon"
                className="p-0 m-0 w-6 h-6 rounded-full"
              >
                <Plus size={18} />
              </Button>
            </div>
          </div>
        </div>
        <Button className="w-full" variant={"default"}>
          <PlusIcon />
          Add
        </Button>
      </div>
      <div> {/* Block List */}</div>
    </div>
  );
}
