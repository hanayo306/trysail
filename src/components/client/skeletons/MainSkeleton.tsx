'use client';

import { Skeleton } from '@mui/material';

const MainSkeleton = () => {
  return (
    <div>
      {/* TODO: set height screen */}
      <Skeleton variant='rectangular' width='full' height={320} className='mb-12' />

      <div className='md:px-4 max-w-6xl mx-auto'>
        <div className='pt-2 px-2 md:p-0'>
          <Skeleton variant='rounded' width={80} height={40} className='mb-4' />
        </div>

        <ul>
          {[...new Array(6).keys()].map(key => (
            <li
              key={key}
              className='overflow-hidden max-w-[360px] md:max-w-full w-full flex flex-col md:flex-row items-start mx-auto gap-4 mb-8'
            >
              <Skeleton variant='rounded' width={360} height='auto' className='block w-[360px] aspect-video' />

              <div className='px-2 md:px-0 flex gap-4 items-center'>
                <Skeleton variant='text' width={80} height={40} />
                <Skeleton variant='text' width={50} height={40} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainSkeleton;
