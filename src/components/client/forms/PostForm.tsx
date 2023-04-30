'use client';

import { ChangeEventHandler, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Alert, Button, Modal, Snackbar, TextField } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { UserInformation } from '@/utils/getUserByToken';
import supabase from '@/libs/supabase';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { imageCount } from '@/utils/imageCount';
import BackBtn from '../buttons/BackBtn';
import blurDataURL from '@/const';
import getImagesUploadedByUser from '@/utils/getImagesFromEmail';

type PostInput = {
  title: string;
  content: string;
  user_id: string;
  user_name: string;
};

const PostForm = ({ userInformation }: { userInformation: UserInformation }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostInput>();

  const fileInput = useRef<HTMLInputElement>(null);

  // error message
  const [errorMessage, setErrorMessage] = useState('');

  // isLoading state
  const [isLoading, setIsLoading] = useState(false);

  // modal
  const [focusFile, setFocusFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = (file: File) => {
    setFocusFile(file);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  // files
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) return;

    const arrayedFiles = Array.from(e.target.files);

    const regex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9]{1,10}$/;

    const correctName = arrayedFiles.every(file => regex.test(file.name));

    if (!correctName) {
      setErrorMessage('파일명은 영문, 숫자, -_ 만 가능합니다(공백 제외).');
      return setOpenSnackbar(true);
    }

    const filteredFiles = arrayedFiles.filter(file => !files.map(f => f.name).includes(file.name));

    setFiles([...files, ...filteredFiles]);
    fileInput.current && (fileInput.current.value = '');
  };

  const handleRemove = (name: string) => {
    const filteredFiles = files.filter(file => file.name !== name);
    setFiles(filteredFiles);
  };

  const onSubmit: SubmitHandler<PostInput> = async data => {
    if (!files.length) {
      setErrorMessage('사진을 하나 이상 올려주세요.');
      return setOpenSnackbar(true);
    }

    setIsLoading(true);

    // get file urls
    const imagesUploadedBefore = await getImagesUploadedByUser(userInformation.user.email!, {
      bucketName: 'posts',
    });
    const beforeFileNames = imagesUploadedBefore.map(file => file.name);

    const filteredFiles = files.filter(file => !beforeFileNames.includes(file.name));
    const duplicatedFiles = files.filter(file => beforeFileNames.includes(file.name));

    if (duplicatedFiles.length > 0) {
      setOpenSnackbar(true);
      setErrorMessage('이전에 올렸던 중복된 파일은 이전 파일로 대체됩니다.');
    }

    const duplicatedUrls = duplicatedFiles
      .map(file => supabase.storage.from('posts').getPublicUrl(`${userInformation?.user.email}/${file.name}`))
      .map(data => data.data.publicUrl);

    // file Upload
    const uploadPromises = filteredFiles.map(file =>
      supabase.storage.from('posts').upload(`${userInformation?.user.email}/${file.name}`, file)
    );

    const uploadResults = await Promise.all(uploadPromises);

    const fileUrls = uploadResults
      .map(result => supabase.storage.from('posts').getPublicUrl(result.data?.path || ''))
      .map(data => data.data.publicUrl);

    // create post
    try {
      const { data: post, error } = await supabase.from('posts').insert({
        ...data,
        images: [...fileUrls, ...duplicatedUrls],
        user_id: userInformation.user.id,
        user_name: userInformation.profile.user_name,
      });

      if (error) throw new Error();

      router.push('/posts');
      router.refresh();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='error' sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Modal
        open={open}
        onClose={handleClose}
        className='w-full fixed left-0 top-0 flex justify-center items-center p-4'
        disableAutoFocus
      >
        <>
          {!!files.length && focusFile && (
            <Image
              placeholder='blur'
              blurDataURL={blurDataURL}
              src={URL.createObjectURL(focusFile)}
              alt={focusFile.name}
              width={288}
              height={512}
              className='object-contain max-w-7xl w-full max-h-[90vh] h-auto shadow-xl bg-gray-600'
              onClick={handleClose}
              unoptimized
            />
          )}
          <CloseIcon onClick={handleClose} className='absolute right-4 top-4 cursor-pointer text-white' />
        </>
      </Modal>

      <BackBtn />

      <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
        <TextField
          id='title'
          type='title'
          label='제목'
          variant='outlined'
          fullWidth
          {...register('title', {
            required: '제목을 입력해주세요',
          })}
          className='mb-4'
          helperText={<span className='text-red-400'>{errors.title?.message || <>&nbsp;</>}</span>}
        />

        <div className='p-2 border rounded-xl'>
          <Textarea placeholder='내용' {...register('content')} className='border-none p-1 mb-8'></Textarea>

          {!!files.length && (
            <Swiper
              spaceBetween={20}
              slidesPerView={1.3}
              breakpoints={{
                768: {
                  slidesPerView: imageCount(files.length),
                },
              }}
              className='my-4 select-none'
            >
              {files.map(file => (
                <SwiperSlide key={file.name} className='relative cursor-pointer'>
                  <Image
                    blurDataURL={URL.createObjectURL(file)}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={200}
                    height={256}
                    className='rounded-xl object-cover w-full aspect-[9/13] border'
                    onClick={() => handleOpen(file)}
                  />
                  <CloseIcon
                    onClick={() => handleRemove(file.name)}
                    className='absolute right-2 top-2 border-blue-400 border rounded-full bg-white cursor-pointer'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {!files.length && (
            <div className='bg-gray-200 flex justify-center items-center h-64 my-4 rounded-xl'>
              <AddAPhotoIcon />
            </div>
          )}

          <Button variant='contained' component='label' className='mb-4 bg-blue-400' fullWidth>
            <AddAPhotoIcon />
            <input type='file' hidden multiple accept='image/*' onChange={handleFilesChange} ref={fileInput} />
          </Button>
        </div>
        <div className='flex items-center mt-4 gap-4'>
          <Button type='submit' variant='contained' className='bg-blue-400' disabled={isLoading}>
            완료
          </Button>

          {isLoading && <AutorenewIcon className='animate-spin' color='action' />}
        </div>
      </form>
    </>
  );
};

export default PostForm;
