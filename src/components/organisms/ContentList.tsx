import { useState } from 'react';
import { Avatar, Card, Flex, FloatButton, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { getPosts } from '@/api/posts';
import { cardContentStyle } from '@/lib/mocks';
import { modalStore } from '@/store/slices';
import ModalCreatePostForm from '@/components/molecules/Modal/Form/ModalCreatePostForm';

const ContentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 5;

  const { showModal } = modalStore();

  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (posts.isLoading || users.isLoading) {
    return (
      <Flex gap='middle' align='center' vertical>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardContentStyle} key={index} />
        ))}
      </Flex>
    );
  }

  const totalPosts = posts.data?.length || 0;

  const paginatedData = posts.data?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  return (
    <Flex gap='middle' align='center' vertical>
      {paginatedData?.map((post: PostProps) => {
        const user = users.data?.find((u: UserProps) => u.id === post.user_id);
        return (
          <Card style={cardContentStyle} key={post.id}>
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${post.id}`}
                />
              }
              title={post.title}
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

      {showModal.create && (
        <ModalCreatePostForm title='Create Post' defaultValues={null} />
      )}
    </Flex>
  );
};

export default ContentList;
