import Link from "next/link";
import { IconType } from "react-icons/lib";

interface LinkBtnProps {
  size?: number;
  disabled?: boolean;
  Icon: IconType;
  href: string;
}

const LinkBtn = ({ Icon, disabled = false, size = 36, href }: LinkBtnProps) => {
  if (disabled) {
    return (
      <span className="rounded-full w-fit h-fit overflow-hidden border bg-gray-200 text-gray-400 opacity-50">
        <Icon size={size} />
      </span>
    );
  }

  return (
    <Link className="rounded-full w-fit h-fit overflow-hidden border" href={href}>
      <Icon size={size} />
    </Link>
  );
};

export default LinkBtn;
