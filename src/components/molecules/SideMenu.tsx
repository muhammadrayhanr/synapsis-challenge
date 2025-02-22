import React from 'react';
import { HomeOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { menuStyle } from '@/lib/mocks';

type MenuItem = Required<MenuProps>['items'][number];

const SideMenu: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  const items: MenuItem[] = [
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
