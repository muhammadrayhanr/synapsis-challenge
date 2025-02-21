import Content from '@/components/Content';
import { getUsers } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/posts';

export default function Home() {
  const users = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const posts = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <>
      <Content
        userData={users.data}
        userDataLoading={users.isLoading}
        postData={posts.data}
        postDataLoading={posts.isLoading}
      />
    </>
  );
}
