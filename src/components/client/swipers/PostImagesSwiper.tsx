"use client";

import { imageCount } from "@/utils/imageCount";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const PostImagesSwiper = ({ images }: { images: string[] }) => {
  return (
    <Swiper spaceBetween={50} slidesPerView={imageCount(images.length)} className="my-4 select-none">
      {images.map(imageUrl => (
        <SwiperSlide key={imageUrl}>
          <Image
            blurDataURL={imageUrl}
            src={imageUrl}
            alt="post image"
            width={600}
            height={600}
            className="rounded-xl object-cover w-[600px] h-[600px] border cursor-pointer"
            priority
            placeholder="blur"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PostImagesSwiper;
