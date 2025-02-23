import { getUserPosts } from '@/api/posts';
import { cardContentStyle, cardProfileStyle } from '@/lib/mocks';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card } from 'antd';
import React from 'react';

const ProfilePost: React.FC<ProfileProps> = ({ userId, viewOnly }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });

  return (
    <div className='my-8 flex flex-col'>
      <span className='text-lg font-semibold mb-3'>
        {data?.length} POST{data?.length > 1 && 'S'}
      </span>
      {data?.length === 0 ? (
        !viewOnly ? (
          <span className='text-center'>Publish your first post.</span>
        ) : (
          <span className='text-center'>
            This user doesn&apos;t have a single post.
          </span>
        )
      ) : (
        <div className='grid md:grid-cols-3 lg:grid-cols-2 gap-3 place-items-center'>
          {data?.map((post: PostProps) => (
            <Card style={cardProfileStyle} key={post.id}>
              <Card.Meta
                title={post?.title}
                description={
                  <>
                    <p className='line-clamp-2'>{post?.body}</p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePost;
