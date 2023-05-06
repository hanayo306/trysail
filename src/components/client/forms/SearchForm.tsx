'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import getPostsByKeyword from '@/utils/getPostsByKeyword';
import { Post } from '@/types/response';
import { useState } from 'react';
import MainItem from '@/components/server/items/MainItem';

type Input = {
  text: string;
};

const SearchForm = () => {
  const { register, handleSubmit } = useForm<Input>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const onSubmit: SubmitHandler<Input> = async inputs => {
    const { posts, count } = await getPostsByKeyword(inputs.text);

    setPosts(posts);
    setIsSearched(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='px-4 my-5'>
          <TextField
            {...register('text', {
              required: '검색어를 입력해주세요',
            })}
            fullWidth
            label='검색어'
            variant='outlined'
            error={Boolean(isSearched && !posts?.length)}
          />
        </div>
      </form>

      {!isSearched && (
        <div className='flex justify-center'>
          <p>검색해보아요</p>
        </div>
      )}

      {isSearched && posts?.length === 0 && (
        <div className='flex justify-center'>
          <p>검색 결과가 없습니다</p>
        </div>
      )}

      <ul>
        {posts?.map(post => (
          <MainItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default SearchForm;
