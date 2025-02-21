import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

const menuStyle: React.CSSProperties = {
  width: 200,
  backgroundColor: '#F5F5F5',
  borderRight: '0',
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

const SideMenu: React.FC = () => {
  const router = useRouter();
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      style={menuStyle}
      defaultSelectedKeys={['/']}
      mode='inline'
      items={items}
    />
  );
};

export default SideMenu;
