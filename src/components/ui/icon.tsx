import * as Fa6Icons from "react-icons/fa6";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import * as Hi2Icons from "react-icons/hi2";
import * as PiIcons from "react-icons/pi";

import * as LucideIcons from "react-icons/lu";
import { ElementType, ReactElement, ReactNode, createElement } from "react";
import { cn } from "@/lib/utils";

type IconProps = {
  icon_code: string;
  className?: string;
  onClick?: () => void;
};

export default function Icon(props: IconProps) {
  const [icon_source, icon_name] = props.icon_code.split("/");
  let Icon: any = null;

  switch (icon_source) {
    case "fa6":
      Icon = Fa6Icons[icon_name as keyof typeof Fa6Icons];
      break;
    case "fa":
      Icon = FaIcons[icon_name as keyof typeof FaIcons];
      break;
    case "lu":
      Icon = LucideIcons[icon_name as keyof typeof LucideIcons];
      break;
    case "md":
      Icon = MdIcons[icon_name as keyof typeof MdIcons];
      break;
    case "hi":
      Icon = HiIcons[icon_name as keyof typeof HiIcons];
      break;
    case "hi2":
      Icon = Hi2Icons[icon_name as keyof typeof Hi2Icons];
      break;
    case "pi":
      Icon = PiIcons[icon_name as keyof typeof PiIcons];
      break;
    default:
      Icon = null;
  }

  return Icon ? (
    <Icon className={cn(props.className)} onClick={props.onClick} />
  ) : null;
}
