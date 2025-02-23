import React, { useState } from 'react';
import { Layout, Drawer, Menu, Button } from 'antd';
import {
  MenuOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { userStore } from '@/store/slices';
import { headerStyle } from '@/lib/mocks';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { userId } = userStore();

  const toggleDrawer = () => setOpen(!open);

  const onClickMenu = (e: { key: string }) => {
    router.push(e.key);
    setOpen(false);
  };

  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: 'Home' },
    { key: '/users', icon: <TeamOutlined />, label: 'Users' },
    ...(userId
      ? [{ key: '/profile', icon: <UserOutlined />, label: 'Profile' }]
      : []),
  ];

  return (
    <Header
      style={headerStyle}
      className='flex justify-between items-center px-4'
    >
      <div className='font-semibold text-[18px] p-2'>
        Synapsis Challenge
      </div>

      <Button
        className='lg:hidden text-black text-xl'
        onClick={toggleDrawer}
      >
        <MenuOutlined />
      </Button>

      <Drawer
        title='Menu'
        placement='right'
        closable={true}
        onClose={toggleDrawer}
        open={open}
      >
        <Menu mode='vertical' items={menuItems} onClick={onClickMenu} />
      </Drawer>
    </Header>
  );
};

export default Navbar;
