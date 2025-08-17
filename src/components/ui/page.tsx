import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type PageProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export default function Page(props: PageProps) {
  return <div {...props} className={cn("m-3", props.className)} />;
}
