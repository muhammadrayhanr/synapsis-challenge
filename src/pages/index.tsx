import { Inter } from 'next/font/google';
import { Button } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUsers } from './api/users';

const inter = Inter({ subsets: ['latin'] });

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['users'], queryFn: getUsers });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  if (query.isFetching) return <div>Loading...</div>;

  return (
    <main className={`container mx-auto flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div>
        <Button
          type='primary'
          onClick={() => {
            mutation.mutate({
              id: 2,
              name: 'Test',
              email: 'test@gmail.com',
            });
          }}
        >
          Add User
        </Button>
      </div>
      {query.data?.map((user: User) => (
        <div key={user.id} className='flex flex-col items-center space-y-4'>
          <h2 className='text-2xl font-bold'>{user.name}</h2>
          <p className='text-lg'>{user.email}</p>
        </div>
      ))}
    </main>
  );
}
