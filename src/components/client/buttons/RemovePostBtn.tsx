"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Modal } from "@mui/material";
import supabase from "@/libs/supabase";

const RemovePostBtn = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const handleRemoveOpen = () => setRemoveOpen(true);
  const handleRemoveClose = () => setRemoveOpen(false);

  const removePost = async () => {
    setIsLoading(true);
    await supabase.from("posts").update({ deleted: true }).eq("id", postId);
    router.push("/");
    handleRemoveClose();
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        open={removeOpen}
        onClose={handleRemoveClose}
        className="w-full fixed left-0 top-0 flex justify-center items-center p-4"
        disableAutoFocus
      >
        <div className=" bg-white p-4 m-4 rounded-xl w-screen max-w-xl relative">
          <p className="font-bold text-center text-2xl mb-8">정말로 삭제할까요?</p>

          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            className="bg-red-400 mb-4"
            fullWidth
            onClick={removePost}
          >
            삭제하기
          </Button>
          <Button
            variant="contained"
            color="info"
            disabled={isLoading}
            className="bg-blue-300"
            fullWidth
            onClick={handleRemoveClose}
          >
            취소하기
          </Button>
        </div>
      </Modal>

      <Button variant="contained" color="error" disabled={isLoading} className="bg-red-400" onClick={handleRemoveOpen}>
        삭제하기
      </Button>
    </>
  );
};

export default RemovePostBtn;
