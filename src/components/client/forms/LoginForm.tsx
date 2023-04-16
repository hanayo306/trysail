"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, TextField, Alert, Snackbar } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClose = () => setIsLoginError(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    setIsLoading(true);
    try {
      // create user account
      const { data: userData, error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (!userData.session) {
        setErrorMessage(loginError?.message || "");
        throw new Error();
      }

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select()
        .eq("user_id", userData.user?.id);

      if (!profileData) {
        setErrorMessage(profileError?.message || "");
        throw new Error(profileError.message);
      }

      if (!profileData[0].user_name) throw new Error("no name");

      const maxAge = 604_800; // 1 week
      document.cookie = `access_token=${userData.session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      document.cookie = `refresh_token=${userData.session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsLoginError(true);
    }
  };

  return (
    <>
      <Snackbar open={isLoginError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 py-4 max-w-xl w-full">
        <TextField
          required
          id="email"
          type="email"
          label="Email"
          variant="outlined"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          helperText={<span className="text-red-400">{errors.email?.message || <>&nbsp;</>}</span>}
        />

        <TextField
          required
          id="password"
          type="password"
          label="Password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          helperText={<span className="text-red-400">{errors.password?.message || <>&nbsp;</>}</span>}
        />

        <Button variant="contained" disabled={isLoading} className="bg-blue-400 mt-4" type="submit">
          로그인
        </Button>

        <Link href="/auth/register">
          <Button fullWidth>회원가입</Button>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
