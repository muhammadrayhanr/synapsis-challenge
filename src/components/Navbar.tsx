import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#000',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0',
    boxShadow: '0 2px #f0f0f0',
  };
  
  return (
    <Layout>
      <Header style={headerStyle}>
        <div className='font-semibold text-[18px] text-center lg:text-start w-full'>Synapsis Challenge</div>
      </Header>
    </Layout>
  );
};

export default Navbar;
