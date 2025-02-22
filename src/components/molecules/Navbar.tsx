import React from 'react';
import { Layout } from 'antd';
import { headerStyle } from '@/lib/mocks';

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Layout>
      <Header style={headerStyle}>
        <div className='font-semibold text-[18px] text-center lg:text-start w-full'>
          Synapsis Challenge
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
