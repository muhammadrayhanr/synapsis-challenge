import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const menuStyle: React.CSSProperties = {
  width: 200,
  backgroundColor: '#F5F5F5',
  borderRight: '0',
};

const items: MenuItem[] = [
  {
    key: 'home',
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
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={menuStyle}
      defaultSelectedKeys={['home']}
      mode='inline'
      items={items}
    />
  );
};

export default SideMenu;
