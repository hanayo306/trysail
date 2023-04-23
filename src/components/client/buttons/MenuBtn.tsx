"use client";

import { MouseEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Popover } from "@mui/material";
import { BsThreeDots } from "react-icons/bs";
import LogoutIcon from "@mui/icons-material/Logout";
import supabase from "@/libs/supabase";
import { UserInformation } from "@/utils/getUserByToken";

interface MenuBtnProps {
  userInformation: UserInformation | null;
  children?: ReactNode;
}

const MenuBtn = ({ userInformation, children = <BsThreeDots /> }: MenuBtnProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setDisabled(true);
    await supabase.auth.signOut();

    const expires = new Date(0).toUTCString();
    document.cookie = `access_token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    document.cookie = `refresh_token=; path=/; expires=${expires}; SameSite=Lax; secure`;
    router.push("/auth/login");
    router.refresh();
    setDisabled(false);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="text-gray-700"
        sx={{
          boxShadow: "none",
        }}
      >
        {userInformation && (
          <>
            <Link href={"/profile"} className="block hover:bg-gray-200 py-2 px-4 border-b" onClick={handleClose}>
              프로필
            </Link>
            <button
              onClick={() => {
                handleClose();
                logout();
              }}
              className="flex hover:bg-gray-200 gap-2 items-center py-2 px-4"
            >
              로그아웃 <LogoutIcon fontSize="small" className="text-blue-400" />
            </button>
          </>
        )}

        {!userInformation && (
          <>
            <Link href={"/auth/login"} className="block hover:bg-gray-200 py-2 px-4" onClick={handleClose}>
              로그인
            </Link>
          </>
        )}
      </Popover>

      <button aria-describedby={id} onClick={handleClick} disabled={disabled}>
        {children}
      </button>
    </>
  );
};

export default MenuBtn;
