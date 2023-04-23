"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { TextField, Button, Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/libs/supabase";
import blurDataURL from "@/const";

type RegisterInputs = {
  email: string;
  password: string;
  passwordConfirm: string;
  user_name: string;
};

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterInputs>();

  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const regex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]{1,10}$/;

      const correctName = regex.test(e.target.files[0].name);

      if (!correctName) {
        setErrorMessage("파일명은 영문, 숫자, -_ 만 가능합니다(공백 제외).");
        return setError(true);
      }

      setProfileImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<RegisterInputs> = async data => {
    if (!profileImage) {
      setError(true);
      setErrorMessage("Please upload a profile image");
      return;
    }

    setIsLoading(true);

    try {
      // create user account
      const { data: userData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (!userData.user) {
        setErrorMessage("Error creating user account");
        throw new Error(error?.message || "");
      }

      const { data: existEmail } = await supabase.from("user_profiles").select("email").eq("email", data.email);

      if (existEmail && existEmail[0]) {
        setError(true);
        setErrorMessage("Email already exists");
        throw new Error("Email already exists");
      } else {
        // upload profile image and create user profile
        const { data: avatar } = await supabase.storage
          .from("avatars")
          .upload(`${userData.user?.email}/${profileImage.name}`, profileImage);

        const { data: profile } = supabase.storage.from("avatars").getPublicUrl(avatar?.path || "");

        await supabase.from("user_profiles").insert({
          user_id: userData.user?.id,
          user_name: data.user_name,
          profile_picture_url: profile.publicUrl,
          email: data.email,
        });
      }

      router.push("/auth/signup-success");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 py-4 max-w-xl w-full">
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <div className="py-4 flex justify-center">
        {profileImage ? (
          <Image
            src={URL.createObjectURL(profileImage)}
            alt={profileImage.name}
            width={128}
            height={128}
            className="object-cover w-32 h-32 overflow-hidden rounded-full border-4"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        ) : (
          <div className="w-32 aspect-square bg-gray-400 rounded-full flex justify-center items-center">
            <AddAPhotoIcon color="info" fontSize="large" />
          </div>
        )}
      </div>

      <Button variant="contained" component="label" className="bg-blue-400 pb-4 mb-8">
        Upload File
        <input type="file" hidden accept="image/*" onChange={onProfileImageChange} />
      </Button>

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
        id="user_name"
        label="Username"
        variant="outlined"
        {...register("user_name", {
          required: "Username is required",
        })}
        helperText={<span className="text-red-400">{errors.user_name?.message || <>&nbsp;</>}</span>}
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

      <TextField
        required
        id="passwordConfirm"
        type="password"
        label="Password Confirm"
        variant="outlined"
        {...register("passwordConfirm", {
          required: "PasswordConfirm is required",
          validate: value => value === watch("password") || "The passwords do not match",
        })}
        helperText={<span className="text-red-400">{errors.passwordConfirm?.message || <>&nbsp;</>}</span>}
      />

      <Button variant="contained" disabled={isLoading} className="bg-blue-400 mt-4" type="submit">
        회원가입
      </Button>

      <Link href="/auth/login">
        <Button variant="text" fullWidth>
          로그인
        </Button>
      </Link>
    </form>
  );
};
export default RegisterForm;
