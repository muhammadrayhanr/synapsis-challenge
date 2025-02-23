import { getPostById } from '@/api/posts';
import { getUsers } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Skeleton } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const CommentHeader: React.FC = () => {
  const { query } = useRouter();

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ['posts', query.id],
    queryFn: () => getPostById(Number(query.id)),
    enabled: !!query.id,
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const user = users?.find((u: any) => u.id === post?.user_id);

  if (isPostLoading || isUsersLoading) {
    return (
      <div>
        <div className='flex flex-row items-center gap-5'>
          <Skeleton.Avatar active size={55} shape='circle' />
          <Skeleton.Input active style={{ width: 160, height: 20 }} />
        </div>
        <div className='my-6 flex flex-col gap-2'>
          <Skeleton.Input active style={{ width: '70%', height: 24 }} />
          <Skeleton.Input active style={{ width: '90%', height: 18 }} />
          <Skeleton.Input active style={{ width: '80%', height: 18 }} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-row items-center gap-5'>
        <Avatar
          size={55}
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${post?.user_id}`}
          className='border-2 border-gray-300'
        />
        <Link href={`/users/${post?.user_id}`}>
          <span className='font-semibold text-sm lg:text-base underline'>
            {user?.name || 'Anonymous'}
          </span>
        </Link>
      </div>
      <div className='my-6'>
        <span className='font-semibold text-lg'>{post?.title}</span>
        <p className='mt-6 text-sm'>{post?.body}</p>
      </div>
    </div>
  );
};

export default CommentHeader;
