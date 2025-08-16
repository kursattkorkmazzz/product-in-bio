import { cn } from "@/lib/utils";
import { Loader2Icon, LucideProps } from "lucide-react";

export default function Loading(props: LucideProps) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2Icon
        className={cn(!props.size && "size-32", "animate-spin")}
        {...props}
      />
    </div>
  );
}
