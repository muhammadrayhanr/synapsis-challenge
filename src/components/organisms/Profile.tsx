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
  const { userId } = userStore();
  const router = useRouter();

  const { setUserId } = userStore();

  useEffect(() => {
    if (!userId) {
      router.push('/');
      showNotification(
        'error',
        'Forbidden Act',
        'You have to login first. Please try again.'
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
        'User has been successfully deleted.'
      );
    },
    onError: () => {
      showNotification(
        'error',
        'Delete Failed',
        'Failed to delete user. Please try again.'
      );
    },
  });

  const confirm = (user: any) => {
    submit.mutate({ id: user });
  };

  return (
    <div className='bg-white rounded-lg items-center p-6'>
      <ProfileHeader userId={userId} viewOnly={false} />
      <ProfilePost userId={userId} viewOnly={false} />
      <div className='flex justify-end'>
        <Popconfirm
          key='delete'
          title='Delete Account'
          description='Are you sure to delete your account?'
          onConfirm={() => confirm(userId)}
          okText='Yes'
          cancelText='No'
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button color='danger' variant='outlined' className='text-sm'>
            <DeleteOutlined />
            Delete Account
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};

export default Profile;
