import React, { useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Card,
  Dropdown,
  Flex,
  MenuProps,
  Pagination,
  Space,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { userStore } from '@/store/slices';

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 6;
  const userId = userStore((state) => state.userId);
  const getUserId = userStore((state) => state.getUserId);

  console.log(userId);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const cardStyle: React.CSSProperties = {
    width: '100%',
    minWidth: 260,
    maxWidth: '40%',
    border: '3px solid #f0f0f0',
  };

  const totalPosts = data?.length || 0;

  const paginatedData = data?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  if (isLoading) {
    return (
      <Flex gap='middle' align='center' vertical>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardStyle} key={index} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex vertical align='center' className='py-3'>
      <Flex wrap gap='small' justify='center'>
        {paginatedData.map((user: UserProps, index: number) => (
          <Card
            key={user.id}
            style={cardStyle}
            actions={[
              <EditOutlined key='edit' onClick={() => getUserId(user.id)} />,
              <DeleteOutlined key='delete' />,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                />
              }
              title={
                <div className='font-normal text-base flex items-center justify-between'>
                  <span className='truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]'>
                    {user.name}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full hidden lg:block ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              }
              description={
                <span
                  className={`rounded-full border-2 capitalize px-1 text-xs lg:hidden ${
                    user.status === 'active'
                      ? 'text-green-500 border-green-500'
                      : 'text-red-500 border-red-500'
                  }`}
                >
                  {user.status}
                </span>
              }
            />
          </Card>
        ))}
      </Flex>
      <Pagination
        current={currentPage}
        total={totalPosts}
        pageSize={DATA_PER_PAGE}
        onChange={(page) => setCurrentPage(page)}
        className='mt-5'
      />
    </Flex>
  );
};

export default Users;
