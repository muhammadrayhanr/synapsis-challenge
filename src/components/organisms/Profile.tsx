import { Avatar, Skeleton } from 'antd';
import React from 'react';
import { userStore } from '@/store/slices';
import { useQuery } from '@tanstack/react-query';
import { getUserDetail } from '@/api/users';

const Profile: React.FC = () => {
  const { userId } = userStore();

  const { data, isLoading } = useQuery({
    queryKey: ['detail', userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className='flex flex-col text-center lg:flex-row gap-5 items-center p-6'>
        <Skeleton.Avatar active size={84} shape='circle' />
        <div className='flex flex-col text-center py-2 gap-2 items-center lg:items-start'>
          <Skeleton.Node active style={{ width: 160, height: 18 }} />
          <Skeleton.Node active style={{ width: 100, height: 20 }} />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-white rounded-lg lg:flex-row gap-5 items-center p-6'>
      <Avatar
        size={84}
        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`}
        className='border-2 border-gray-300'
      />
      <div className='flex flex-col text-center py-2 gap-2 items-center lg:items-start'>
        <div className='flex flex-col lg:flex-row lg:gap-2'>
          <span className='font-semibold'>{`${data?.name}`}</span>
          <span className='italic text-sm font-light lg:text-base'>{`(${data?.email})`}</span>
        </div>

        <span
          className={`inline-block rounded-full border-2 capitalize px-3 py-1 text-xs ${
            data?.status === 'active'
              ? 'text-green-500 border-green-500'
              : 'text-red-500 border-red-500'
          }`}
        >
          {data?.status}
        </span>
      </div>
    </div>
  );
};

export default Profile;
