import Content from '@/components/Content';
import Navbar from '@/components/Navbar';
import SideMenu from '@/components/SideMenu';
import { Col, Row } from 'antd';
import { Inter } from 'next/font/google';
import { getUsers } from './api/users';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // const [userData, setUserData] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  // if(isSuccess) return setUserData(data);

  // console.log(data);

  return (
    <div className={`min-h-screen bg-background ${inter.className}`}>
      <Navbar />
      <main>
        <Row gutter={[16, 16]} className='flex justify-center p-8'>
          <Col span={4} className='hidden lg:block'>
            <SideMenu />
          </Col>
          <Col span={12} className='pb-3'>
            <Content userData={data} userDataLoading={isLoading} />
          </Col>
          <Col span={8} className='bg-red-500 hidden lg:block'>
            col-8
          </Col>
        </Row>
      </main>
    </div>
  );
}
