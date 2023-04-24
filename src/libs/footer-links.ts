import { BsTwitter, BsGithub } from "react-icons/bs";
import { IconType } from "react-icons/lib";

type Link = {
  title: string;
  href: string;
  Icon: IconType;
};

const footerLinks: Link[] = [
  {
    title: "Github",
    href: "https://github.com/hanayo306/trysail",
    Icon: BsGithub,
  },
  {
    title: "twitter",
    href: "https://twitter.com/hanayo306",
    Icon: BsTwitter,
  },
];

export default footerLinks;
