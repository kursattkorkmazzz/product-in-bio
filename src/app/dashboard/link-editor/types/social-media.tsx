import Icon from "@/components/ui/icon";
import { ReactElement } from "react";

export type SocialMediaType = {
  platform: string;
  icon: ReactElement;
  example: string;
  base?: string; // Optional base URL for platforms like Instagram
};

const SocialMediaTypeList: SocialMediaType[] = [
  {
    platform: "Youtube",
    icon: <Icon icon_code="fa6/FaYoutube" />,
    example: "https://youtube.com/channel/channelurl",
  },
  {
    platform: "Instagram",
    icon: <Icon icon_code="fa6/FaInstagram" />,
    example: "@username",
    base: "https://instagram.com/",
  },
  {
    platform: "Facebook",
    icon: <Icon icon_code="fa6/FaFacebook" />,
    example: "https://facebook.com/pageurl",
  },
  {
    platform: "Email",
    icon: <Icon icon_code="md/MdAlternateEmail" />,
    example: "youremail@domain.com",
  },
];

export default SocialMediaTypeList;
