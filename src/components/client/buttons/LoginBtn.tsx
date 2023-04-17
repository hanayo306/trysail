"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";

const LoginBtn = () => {
  return (
    <Link href="/auth/login">
      <Button variant="contained" className="bg-blue-400 flex gap-2">
        로그인
        <LoginIcon />
      </Button>
    </Link>
  );
};

export default LoginBtn;
