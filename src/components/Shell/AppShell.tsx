import { ReactNode } from 'react';
import Navbar from '../Navbar';
import { Inter } from 'next/font/google';
import SideMenu from '../SideMenu';

const inter = Inter({ subsets: ['latin'] });

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Navbar />
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-3 justify-center p-8'>
        <div className='hidden lg:block'>
          <SideMenu />
        </div>
        <div className='col-span-3 pb-3'>
          {children}
        </div>
        <div className='hidden lg:block' />
      </div>
    </div>
  );
};

export default AppShell;
