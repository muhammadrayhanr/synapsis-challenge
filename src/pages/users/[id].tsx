import React, { useEffect } from 'react';
import { userStore } from '@/store/slices';
import ProfileHeader from '@/components/molecules/Profile/ProfileHeader';
import ProfilePost from '@/components/molecules/Profile/ProfilePost';
import { showNotification } from '@/lib/utils';
import { useRouter } from 'next/router';

const UserProfile: React.FC = () => {
  const { userId } = userStore();
  const router = useRouter();

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

  return (
    <div className='bg-white rounded-lg items-center p-6'>
      <ProfileHeader userId={router.query.id} viewOnly={true} />
      <ProfilePost userId={router.query.id} viewOnly={true} />
    </div>
  );
};

export default UserProfile;
