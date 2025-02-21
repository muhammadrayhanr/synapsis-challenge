import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 6;

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const cardStyle: React.CSSProperties = {
    width: '100%',
    minWidth: 200,
    maxWidth: '40%',
    border: '3px solid #f0f0f0',
  };

  const handleEditClick = (index: number) => {
    console.log(`Edit Card ${index}`);
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
    <Flex vertical align='center'>
      <Flex wrap gap='small' justify='center' align='center'>
        {paginatedData.map((user: UserProps, index: number) => (
          <Card
            key={user.id}
            style={cardStyle}
            actions={[
              <EditOutlined
                key='edit'
                onClick={() => handleEditClick(index)}
              />,
              <EllipsisOutlined key='ellipsis' />,
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
