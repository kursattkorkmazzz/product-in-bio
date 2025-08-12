import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Link href={"/login"}>
        <Button variant={"outline"}>Login</Button>
      </Link>
    </div>
  );
}
