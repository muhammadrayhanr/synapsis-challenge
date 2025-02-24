import { useState } from 'react';
import { Avatar, Card, Flex, FloatButton, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { getPosts } from '@/api/posts';
import { cardContentStyle } from '@/lib/mocks';
import { modalStore, userStore } from '@/store/slices';
import ModalCreatePostForm from '@/components/molecules/Modal/Form/ModalCreatePostForm';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';

const ContentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 4;

  const { showModal, setShowModal } = modalStore();
  const { userId } = userStore();

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (postsLoading || usersLoading) {
    return (
      <Flex gap='middle' align='center' vertical>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardContentStyle} key={index} />
        ))}
      </Flex>
    );
  }

  const totalPosts = posts?.length || 0;

  const paginatedData = posts?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  return (
    <div className='grid gap-3 place-items-center'>
      {paginatedData?.map((post: PostProps) => {
        const user = users?.find((u: UserProps) => u.id === post.user_id);
        return (
          <Card style={cardContentStyle} key={post.id}>
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${post.user_id}`}
                />
              }
              title={
                <>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </>
              }
              description={
                <>
                  <p className='line-clamp-4'>{post.body}</p>
                  <p className='text-end pt-5 italic text-xs'>
                    <strong>Author:</strong> {user ? user.name : 'Anonymous'}
                  </p>
                </>
              }
            />
          </Card>
        );
      })}

      <Pagination
        current={currentPage}
        total={totalPosts}
        pageSize={DATA_PER_PAGE}
        onChange={(page) => setCurrentPage(page)}
      />

      {showModal.createPost && userId && (
        <ModalCreatePostForm title='Create Post' defaultValues={null} />
      )}

      {userId && (
        <FloatButton
          icon={<PlusOutlined />}
          type='primary'
          style={{
            insetInlineEnd: 40,
            width: 54,
            height: 54,
            fontSize: 12,
          }}
          onClick={() => setShowModal({ createPost: true })}
        />
      )}
    </div>
  );
};

export default ContentList;
