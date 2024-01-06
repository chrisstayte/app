import Image from 'next/image';
import Footer from './components/footer';

import { fredoka } from './fonts';
import AppIcon from './components/app_icon';
import AppIconName from './components/app_icon_name';

export default function Home() {
  return (
    <main className={`${fredoka.className} flex min-h-screen flex-col `}>
      <div className='flex h-80 justify-center'>
        <div className='flex flex-col justify-center gap-2'>
          <p className='text-2xl text-left font-normal'>
            I&#39;m Chris - Engineer
          </p>
        </div>
      </div>
      <div className=' container min-w-full bg-blue-300 h-80 place-content-center flex flex-col text-white '></div>
    </main>
  );
}
