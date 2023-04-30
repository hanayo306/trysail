import Image from 'next/image';
import blurDataURL from '@/const';

interface RecentImagesProps {
  title: string;
  urls: {
    name: string;
    url: string;
  }[];
}

const RecentImages = ({ urls, title }: RecentImagesProps) => {
  return (
    <div>
      <h2 className='font-bold text-xl mb-2'>{title}</h2>
      <ul className='flex flex-wrap overflow-hidden rounded-2xl border'>
        {urls.map(image => (
          <li key={image.name} className='w-1/2 md:w-1/3 aspect-square overflow-hidden'>
            <Image
              width={300}
              height={200}
              src={image.url}
              alt={image.name}
              className='w-full h-full object-cover'
              placeholder='blur'
              blurDataURL={blurDataURL}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentImages;