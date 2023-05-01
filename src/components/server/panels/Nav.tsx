import Image from 'next/image';
import { cookies } from 'next/headers';
import Link from 'next/link';

import MenuBtn from '@/components/client/buttons/MenuBtn';
import LoginBtn from '@/components/client/buttons/LoginBtn';
import getUserByToken from '@/utils/getUserByToken';
import { BsSearch } from 'react-icons/bs';

import logo from '@/assets/logo.png';

const Nav = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  const userInformation = await getUserByToken(token);

  return (
    <nav className='border-b sticky top-0 bg-white/50 backdrop-blur z-10'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-2 md:px-4 py-2'>
        <div className='flex gap-4 items-center'>
          <Link href={'/'} className='flex items-center gap-2'>
            <Image src={logo} alt='logo' width={32} height={32} className='w-8 h-8' />
            <h1 className='hidden md:block font-bold text-xl'>Trysail</h1>
          </Link>

          <ul className='flex gap-4'>
            <li>
              <Link href='/posts'>스토리</Link>
            </li>
          </ul>
        </div>

        <div className='flex gap-4'>
          <Link href='/posts/search' className='py-1 px-2 border rounded-full flex items-center gap-4'>
            검색
            <BsSearch />
          </Link>
          {userInformation ? (
            <MenuBtn userInformation={userInformation}>
              <Image
                src={userInformation.profile.profile_picture_url}
                alt={`${userInformation.profile.user_name}의 프로필사진`}
                width={36}
                height={36}
                className='rounded-full overflow-hidden w-9 h-9'
              />
            </MenuBtn>
          ) : (
            <LoginBtn />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
