import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import generateNameFallback from "@/utils/name-fallback-generator";

export default function UserGeneralSettings() {
  return (
    <div className="grid grid-cols-3 h-full w-full">
      <div className="flex flex-col items-center justify-center span-1 min-h-48 w-full">
        <Avatar className="rounded-md size-36">
          <AvatarImage className="rounded-md" src={"/"} />
          <AvatarFallback className="rounded-md text-6xl text-muted-foreground bg-muted">
            {generateNameFallback("Kürşat KORKMAZ")}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="span-2">
        {/* TODO: General Settings & Image Upload */}
      </div>
    </div>
  );
}
