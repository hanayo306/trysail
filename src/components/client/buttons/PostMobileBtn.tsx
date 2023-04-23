"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CreateIcon from "@mui/icons-material/Create";
import useScrollDirection from "@/hooks/useScrollDirection";

const PostMobileBtn = () => {
  const pathname = usePathname();
  const direction = useScrollDirection();

  return (
    <Link
      className={`${
        pathname === "/post" ? "hidden" : "block"
      } md:hidden rounded-full overflow-hidden fixed bottom-6 right-6 z-10 transition-[0.3s] ${
        direction === "down" ? "translate-y-28 opacity-0" : "translate-y-0 opacity-100"
      }`}
      href="/post"
    >
      <CreateIcon
        fontSize="large"
        className="text-white bg-blue-400 block md:hidden rounded-full overflow-hidden p-2 !w-16 !h-16"
      />
    </Link>
  );
};

export default PostMobileBtn;
