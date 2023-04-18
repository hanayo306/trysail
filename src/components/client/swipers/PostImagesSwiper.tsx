"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { imageCount } from "@/utils/imageCount";
import { Post } from "@/types/response";

const PostImagesSwiper = ({ post }: { post: Post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [curImage, setCurImage] = useState<string>("");

  const handleSelectedImageOpen = (url: string) => {
    setCurImage(url);
    setIsOpen(true);
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
          {curImage && (
            <>
              <Image
                blurDataURL={curImage}
                src={curImage}
                alt={post.title}
                width={512}
                height={512}
                className="rounded-xl object-contain max-w-7xl w-full max-h-[90vh] h-auto border shadow-xl bg-gray-600"
                unoptimized
              />
            </>
          )}
          <CloseIcon onClick={() => setIsOpen(false)} className="absolute right-4 top-4 cursor-pointer text-white" />
        </>
      </Modal>

      <Swiper //
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: imageCount(post.images.length),
          },
        }}
        className="my-4 select-none"
      >
        {post.images.map(imageUrl => (
          <SwiperSlide key={imageUrl}>
            <Image
              src={imageUrl}
              alt="post image"
              width={600}
              height={600}
              className="rounded-xl object-cover w-full max-w-2xl h-auto border cursor-pointer"
              onClick={() => handleSelectedImageOpen(imageUrl)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PostImagesSwiper;
