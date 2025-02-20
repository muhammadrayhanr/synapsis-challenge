import { useState } from 'react';
import { Avatar, Card, Flex, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/pages/api/posts';
import { getInitials } from '@/lib/utils';

const Content: React.FC<ContentProps> = ({ userData, userDataLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 5;

  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const cardStyle: React.CSSProperties = {
    width: '100%',
    minWidth: 400,
    maxWidth: 600,
    border: '3px solid #f0f0f0',
  };

  if (isLoading || userDataLoading) {
    return (
      <Flex gap='middle' align='center' vertical>
        {[...Array(POSTS_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardStyle} key={index} />
        ))}
      </Flex>
    );
  }

  const totalPosts = data?.length || 0;

  const paginatedData = data?.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  console.log(userData);

  return (
    <Flex gap='middle' align='center' vertical>
      {paginatedData?.map((post: PostProps) => {
        const user = userData?.find((u: UserProps) => u.id === post.user_id);
        const avatarColor = ColorList[Math.floor(Math.random() * ColorList.length)];

        return (
          <Card style={cardStyle} key={post.id}>
            <Card.Meta
              avatar={
                <Avatar style={{ backgroundColor: avatarColor, verticalAlign: 'middle' }} size="large">
                  {getInitials(user ? user.name : 'Anonymous')}
                </Avatar>
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
        pageSize={POSTS_PER_PAGE}
        onChange={(page) => setCurrentPage(page)}
      />
    </Flex>
  );
};

export default Content;
