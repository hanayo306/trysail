'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import getPostsByKeyword from '@/utils/getPostsByKeyword';

type Input = {
  text: string;
};

const SearchForm = () => {
  const { register, handleSubmit } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async inputs => {
    const posts = await getPostsByKeyword(inputs.text);

    console.log(posts);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='px-4 my-5'>
        <TextField
          {...register('text', {
            required: '검색어를 입력해주세요',
          })}
          placeholder='검색어를 입력해주세요'
          fullWidth
          variant='standard'
        />
      </div>
    </form>
  );
};

export default SearchForm;
