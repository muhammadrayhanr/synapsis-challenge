import { deleteUser, getUsers } from '@/api/users';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Pagination } from 'antd';
import { useState } from 'react';
import { cardUserStyle } from '@/lib/mocks';
import queryClient from '@/config/providers/queryClient';
import { showNotification } from '@/lib/utils';
import Link from 'next/link';

const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 8;

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const totalPosts = data?.length || 0;
  const paginatedData = data?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  if (isLoading) {
    return (
      <Flex wrap gap='small' justify='center'>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardUserStyle} key={index} />
        ))}
      </Flex>
    );
  }

  return (
    <Flex vertical align='center' className='py-3'>
      <Flex wrap gap='small' justify='center'>
        {paginatedData.map((user: UserProps) => (
          <Card key={user.id} style={cardUserStyle}>
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                />
              }
              title={
                <div className='font-normal text-base flex items-center justify-between'>
                  <Link href={`/users/${user.id}`}>
                    <span className='truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]'>
                      {user.name}
                    </span>
                  </Link>
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

export default UserList;
