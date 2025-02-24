import { Button, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { userStore } from '@/store/slices';
import ProfileHeader from '@/components/molecules/Profile/ProfileHeader';
import ProfilePost from '@/components/molecules/Profile/ProfilePost';
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/api/users';
import queryClient from '@/config/providers/queryClient';
import { showNotification } from '@/lib/utils';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
  const router = useRouter();

  const { userId, setUserId } = userStore();

  useEffect(() => {
    if (!userId) {
      router.push('/');
      showNotification(
        'error',
        'Forbidden Act',
        'You have to be a user first. Please try again.'
      );
    }
  }, [userId, router]);

  const submit = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser(id),
    onSuccess: () => {
      setUserId(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification(
        'success',
        'User Deleted',
        'User has been successfully revoked.'
      );
    },
    onError: () => {
      showNotification(
        'error',
        'Revoke Failed',
        'Failed to revoke user. Please try again.'
      );
    },
  });

  const confirm = (user: any) => {
    submit.mutate({ id: user });
  };

  return (
    <div className='bg-white border-2 rounded-lg items-center p-6'>
      <ProfileHeader userId={userId} viewOnly={false} />
      <ProfilePost userId={userId} viewOnly={false} />
      <div className='flex justify-end'>
        <Popconfirm
          key='delete'
          title='Revoke Account'
          description='Are you sure to revoke your account?'
          placement='topLeft'
          onConfirm={() => confirm(userId)}
          okText='Yes'
          cancelText='No'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button color='danger' variant='solid' className='text-sm'>
            <DeleteOutlined />
            Revoke Account
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Profile;
