'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AiOutlineClose } from 'react-icons/ai';

const OffCookieBtn = () => {
  const router = useRouter();

  const onClick = () => {
    Cookies.set('isPanelOpen', 'false', { expires: 1 });
    router.refresh();
  };

  return (
    <button onClick={onClick} className='flex items-center gap-4'>
      하루동안 안보기
      <AiOutlineClose />
    </button>
  );
};

export default OffCookieBtn;
