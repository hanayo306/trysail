"use client";

import { useState, ChangeEventHandler } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";
import { IconButton, Snackbar, Alert, Skeleton, Modal } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import useProfileUrls from "@/hooks/useProfileUrls";
import { UserInformation } from "@/utils/getUserByToken";

const SelectProfileImage = ({ userInformation }: { userInformation: UserInformation }) => {
  const router = useRouter();

  // modalOpen
  const [isOpen, setIsOpen] = useState(false);

  // change
  const [isLoading, setIsLoading] = useState(false);

  // upload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const { images, setImages, getImages } = useProfileUrls(userInformation);
  const [errorMessage, setErrorMessage] = useState("");

  const changeProfileImage = async (url: string) => {
    if (isLoading) return;

    setIsLoading(true);
    await supabase
      .from("user_profiles")
      .update({
        profile_picture_url: url,
      })
      .eq("email", userInformation.user.email);

    setIsLoading(false);
    setIsOpen(false);
    router.refresh();
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

    const { data, error } = await supabase.storage.from("avatars").upload(`${userInformation.user.email}/${file.name}`, file);

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
    await supabase.storage.from("avatars").remove([`${userInformation.user.email}/${name}`]);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setUploadError(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full fixed left-0 top-0 flex justify-center items-center p-4"
        disableAutoFocus
      >
        <>
          <Snackbar open={uploadError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <div className=" bg-white p-4 m-4 rounded-xl w-screen max-w-xl relative">
            <CloseIcon onClick={() => setIsOpen(false)} className="absolute right-4 top-6 cursor-pointer" />
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-2xl my-4">프로필 변경</h2>
            </div>
            <p className="text-center">프로필 사진을 선택해주세요</p>

            {!isUploading && !!images.length && (
              <Swiper spaceBetween={50} slidesPerView={3} centeredSlides className="my-4 select-none">
                {images.map(image => (
                  <SwiperSlide
                    key={image.name}
                    className={`relative p-2 ${
                      userInformation.profile.profile_picture_url === image.url ? "border border-blue-400" : ""
                    }`}
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
                    {userInformation.profile.profile_picture_url !== image.url && (
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
                <Skeleton variant="rectangular" width={128} height={128} className="rounded" />
                <Skeleton variant="rectangular" width={128} height={128} className="rounded" />
                <Skeleton variant="rectangular" width={128} height={128} className="rounded" />
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
      </Modal>

      {!isLoading && (
        <Image
          src={userInformation.profile.profile_picture_url}
          blurDataURL={userInformation.profile.profile_picture_url}
          width={80}
          height={80}
          className="overflow-hidden object-cover w-[80px] h-[80px] border rounded-full cursor-pointer hover:border-blue-400 transition-[0.3s]"
          alt={userInformation.profile.user_name}
          onClick={() => setIsOpen(true)}
        />
      )}

      {isLoading && <Skeleton variant="circular" width={80} height={80} />}
    </>
  );
};

export default SelectProfileImage;
