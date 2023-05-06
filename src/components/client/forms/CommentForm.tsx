'use client';

import { useState } from 'react';
import { Post } from '@/types/response';
import { UserInformation } from '@/utils/getUserByToken';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import supabase from '@/libs/supabase';

interface CommentFormProps {
  post: Post;
  userInformation: UserInformation;
}

type Input = {
  comment: string;
};

const CommentForm = ({ userInformation, post }: CommentFormProps) => {
  const { register, handleSubmit } = useForm<Input>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<Input> = async data => {
    setIsLoading(true);
    await supabase.from('comments').insert({
      post_id: post.id,
      user_id: userInformation.user.id,
      user_name: userInformation.profile.user_name,
      content: data.comment,
    });

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-4'>
      <TextField
        {...register('comment')}
        label='댓글'
        variant='outlined'
        fullWidth
        multiline
        rows={2}
        className='mb-4'
      />

      <div className='flex justify-end'>
        <Button disabled={isLoading} variant='contained' type='submit' className='bg-red-400'>
          쓰기
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
