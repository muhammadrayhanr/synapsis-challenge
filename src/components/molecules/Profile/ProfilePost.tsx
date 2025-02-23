import { deletePost, getUserPosts } from '@/api/posts';
import queryClient from '@/config/providers/queryClient';
import { cardProfileStyle } from '@/lib/mocks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card, Button, Popconfirm } from 'antd';
import Link from 'next/link';
import React from 'react';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { showNotification } from '@/lib/utils';

const ProfilePost: React.FC<ProfileProps> = ({ userId, viewOnly }) => {
  const { data } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => getUserPosts(userId),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts', userId] });
      showNotification(
        'success',
        'Post Deleted',
        'Post has been successfully deleted.'
      );
    },
    onError: () => {
      showNotification(
        'error',
        'Delete Failed',
        'Failed to delete post. Please try again.'
      );
    },
  });

  const confirm = (postId: number) => {
    mutation.mutate(postId);
  };

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
                title={<Link href={`/posts/${post.id}`}>{post.title}</Link>}
                description={<p className='line-clamp-2'>{post?.body}</p>}
              />
              {!viewOnly && (
                <Popconfirm
                  key='delete'
                  title='Delete Post'
                  description='Are you sure to delete your post?'
                  onConfirm={() => confirm(post.id)}
                  okText='Yes'
                  cancelText='No'
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button
                    color='danger'
                    variant='outlined'
                    className='text-sm w-full mt-5'
                  >
                    <DeleteOutlined />
                    Delete Post
                  </Button>
                </Popconfirm>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePost;
