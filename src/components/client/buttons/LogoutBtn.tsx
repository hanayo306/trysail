"use client";

import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogoutBtn = () => {
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
    <Button onClick={logout} disabled={disabled} variant="text">
      <LogoutIcon />
    </Button>
  );
};

export default LogoutBtn;
