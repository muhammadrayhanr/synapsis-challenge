import React from 'react';
import { HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

const menuStyle: React.CSSProperties = {
  width: 200,
  backgroundColor: '#F5F5F5',
  borderRight: '0',
};

const SideMenu: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'create-dynamic') {
      console.log(`Create button clicked on ${router.pathname}`);
      return;
    }
    router.push(e.key);
  };

  const dynamicItem: MenuItem = {
    key: 'create-dynamic',
    icon: <PlusOutlined />,
    label: router.pathname === '/' ? 'Create Post' : 'Create User',
  };

  const items: MenuItem[] = [
    dynamicItem,
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
  ];

  return (
    <Menu onClick={onClick} style={menuStyle} mode='inline' items={items} />
  );
};

export default SideMenu;
