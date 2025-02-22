import { useState } from 'react';
import { Avatar, Card, Flex, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { getPosts } from '@/api/posts';

const ContentList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 5;

  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const cardStyle: React.CSSProperties = {
    width: '100%',
    minWidth: 400,
    maxWidth: 600,
    border: '3px solid #f0f0f0',
  };

  if (posts.isLoading || users.isLoading) {
    return (
      <Flex gap='middle' align='center' vertical>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardStyle} key={index} />
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
          <Card style={cardStyle} key={post.id}>
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
    </Flex>
  );
};

export default ContentList;
