import { ReactNode } from 'react';
import Navbar from '../Navbar';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import SideMenu from '../SideMenu';

const inter = Inter({ subsets: ['latin'] });

const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Navbar />
      <Row gutter={[16, 16]} className='flex justify-center p-8'>
        <Col span={4} className='hidden lg:block'>
          <SideMenu />
        </Col>
        <Col span={14} className='pb-3'>
          {children}
        </Col>
        <Col span={6} className='hidden lg:block' />
      </Row>
    </div>
  );
};

export default AppShell;
