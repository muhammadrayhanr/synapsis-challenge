import { ReactNode } from 'react';
import Navbar from '@/components/molecules/Navbar';
import { Inter } from 'next/font/google';
import SideMenu from '@/components/molecules/SideMenu';
import ModalCreateUserForm from '@/components/molecules/Modal/Form/ModalCreateUserForm';
import { modalStore, userStore } from '@/store/slices';
import { FloatButton } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const inter = Inter({ subsets: ['latin'] });

const AppShell = ({ children }: { children: ReactNode }) => {
  const { showModal, setShowModal } = modalStore();
  const { userId } = userStore();

  return (
    <div
      className={`flex flex-col min-h-screen bg-background ${inter.className}`}
    >
      <Navbar />

      <div className='flex-1 grid grid-cols-1 lg:grid-cols-5 gap-3 justify-center p-8'>
        <div className='hidden lg:block'>
          <SideMenu />
        </div>
        <div className='col-span-3 pb-3'>{children}</div>
        <div className='hidden lg:block' />
      </div>

      {showModal.createUser && (
        <ModalCreateUserForm title='Become a user!' defaultValues={null} />
      )}

      {!userId && (
        <FloatButton
          icon={<LoginOutlined />}
          type='primary'
          style={{
            insetInlineEnd: 40,
            width: 54,
            height: 54,
            fontSize: 12,
          }}
          onClick={() => setShowModal({ createUser: true })}
        />
      )}

      <footer className=' text-black text-center py-2 text-sm mt-auto border-t-2 bg-white'>
        Created by Rayhan for Synapsis Challenge
      </footer>
    </div>
  );
};

export default AppShell;
