import { cookies } from 'next/headers';
import OffCookieBtn from '@/components/client/buttons/OffCookieBtn';

const Panel = () => {
  const cookieStore = cookies();
  const isPanelOpen = cookieStore.has('isPanelOpen');

  return (
    <div className={`${isPanelOpen ? 'hidden' : ''} bg-blue-400`}>
      <div className='max-w-6xl mx-auto p-4 flex justify-between'>
        <p>Panel</p>
        <OffCookieBtn />
      </div>
    </div>
  );
};

export default Panel;
