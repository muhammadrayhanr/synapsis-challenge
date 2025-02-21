import { ReactNode } from 'react';
import Navbar from '../Navbar';
import { Col, Row } from 'antd';
import SideMenu from '../SideMenu';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Shell = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Navbar />
      <main>
        <Row gutter={[16, 16]} className='flex justify-center p-8'>
          <Col span={4} className='hidden lg:block'>
            <SideMenu />
          </Col>
          <Col span={14} className='pb-3'>
            {children}
          </Col>
          <Col span={6} className='bg-red-500 hidden lg:block'>
            {/* col-8 */}
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Shell;
