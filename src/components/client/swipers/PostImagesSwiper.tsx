"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { imageCount } from "@/utils/imageCount";
import { Post } from "@/types/response";
import blurDataURL from "@/const";

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
                placeholder="blur"
                blurDataURL={blurDataURL}
                src={curImage}
                alt={post.title}
                width={512}
                height={512}
                className="object-contain max-w-7xl w-full max-h-[90vh] h-auto shadow-xl bg-gray-600"
                unoptimized
              />
            </>
          )}
          <CloseIcon onClick={() => setIsOpen(false)} className="absolute right-4 top-4 cursor-pointer text-white" />
        </>
      </Modal>

      <Swiper //
        spaceBetween={20}
        slidesPerView={1.2}
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
              width={400}
              height={600}
              className="rounded-xl object-cover w-full max-w-2xl aspect-[9/13] border cursor-pointer"
              onClick={() => handleSelectedImageOpen(imageUrl)}
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default PostImagesSwiper;
