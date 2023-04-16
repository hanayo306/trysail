import useProfile from "@/hooks/useProfile";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import Image from "next/image";
import supabase from "@/libs/supabase";
import { useState, ChangeEventHandler } from "react";
import Skeleton from "@mui/material/Skeleton";
import { IconButton, Snackbar, Alert } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useUserStore from "@/stores/useUserStore";

const SelectProfileImage = () => {
  // change
  const [isLoading, setIsLoading] = useState(false);

  // upload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const { userInfo, setUserInfo } = useUserStore();
  const { images, setImages, getImages } = useProfile();
  const [errorMessage, setErrorMessage] = useState("");

  const changeProfileImage = async (url: string) => {
    if (!userInfo) return;
    if (isLoading) return;

    setIsLoading(true);
    await supabase
      .from("user_profiles")
      .update({
        profile_picture_url: url,
      })
      .eq("email", userInfo?.user.email);

    setUserInfo({ ...userInfo, profile_picture_url: url });
    setIsLoading(false);
  };

  const addProfileImage: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) return;

    const regex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]{1,10}$/;

    if (!regex.test(file.name)) {
      setUploadError(true);
      return setErrorMessage("파일 이름에 적절하지 않아요(공백도 안됨). 다른 이름으로 시도해보세요.");
    }

    setIsUploading(true);

    const { data, error } = await supabase.storage.from("avatars").upload(`${userInfo?.user.email}/${file.name}`, file);

    if (!data) {
      setErrorMessage("중복된 이미지가 있어요.");
      setUploadError(true);
      setIsUploading(false);
      return;
    }

    getImages();
    setIsUploading(false);
  };

  const removeProfileImage = async (name: string) => {
    setImages(images.filter(image => image.name !== name));
    await supabase.storage.from("avatars").remove([`${userInfo?.user.email}/${name}`]);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setUploadError(false);
  };

  return (
    <>
      <Snackbar open={uploadError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-2xl my-4">프로필 변경</h2>
        </div>
        <p className="text-center">프로필 사진을 선택해주세요</p>

        {!isUploading && !!images.length && (
          <Swiper spaceBetween={50} slidesPerView={3} centeredSlides className="my-4 select-none">
            {images.map(image => (
              <SwiperSlide
                key={image.name}
                className={`relative p-2 ${userInfo?.profile_picture_url === image.url ? "border border-blue-400" : ""}`}
              >
                <Image
                  src={image.url}
                  blurDataURL={image.url}
                  alt={image.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 overflow-hidden object-cover cursor-pointer"
                  onClick={() => changeProfileImage(image.url)}
                />
                {userInfo?.profile_picture_url !== image.url && (
                  <RemoveCircleOutlineIcon //
                    className="text-white absolute right-4 top-3 border border-black rounded-full cursor-pointer"
                    onClick={() => removeProfileImage(image.name)}
                  />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {(isUploading || !images.length) && (
          <div className="flex gap-8 justify-center my-4">
            <Skeleton variant="rectangular" width="100%" height={128} className="rounded" />
          </div>
        )}

        <div className="flex justify-center">
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={addProfileImage} />
            <PhotoCameraIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SelectProfileImage;
