"use client";

import { Button } from "@mui/material";
import { User } from "@supabase/supabase-js";
import LogoutIcon from "@mui/icons-material/Logout";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LogoutBtnProps {
  userInformation: {
    user: User;
    profile: {
      user_name: string;
      profile_picture_url: string;
    };
  };
}

const LogoutBtn = ({ userInformation }: LogoutBtnProps) => {
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
  };

  return (
    <div className="w-full flex justify-between items-center">
      <p className="font-bold text-xl">{userInformation.profile.user_name}</p>
      <Button onClick={logout} disabled={disabled} variant="text">
        <LogoutIcon />
      </Button>
    </div>
  );
};

export default LogoutBtn;
