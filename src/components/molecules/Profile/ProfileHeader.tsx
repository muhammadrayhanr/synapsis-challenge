import { getUserDetail } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Skeleton } from 'antd';
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { modalStore } from '@/store/slices';
import ModalEditUserForm from '@/components/molecules/Modal/Form/ModalEditUserForm';

const ProfileHeader: React.FC<ProfileProps> = ({ userId, viewOnly }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  });

  const { showModal, setShowModal } = modalStore();

  const handleEditClick = () => {
    setShowModal({ edit: true });
  };

  if (isLoading) {
    return (
      <div className='flex flex-col text-center lg:flex-row gap-5 items-center p-6'>
        <Skeleton.Avatar active size={84} shape='circle' />
        <div className='flex flex-col text-center py-2 gap-2 items-center lg:items-start'>
          <Skeleton.Node active style={{ width: 160, height: 18 }} />
          <Skeleton.Node active style={{ width: 100, height: 20 }} />
        </div>
      </div>
    );
  }
  return (
    <div className='flex flex-col text-center lg:flex-row gap-5 items-center'>
      <Avatar
        size={84}
        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${userId}`}
        className='border-2 border-gray-300'
      />
      <div className='flex flex-col text-center py-2 gap-2 items-center lg:items-start'>
        <div className='flex flex-col lg:flex-row lg:gap-2'>
          <span className='font-semibold'>{`${data?.name}`}</span>
          <span className='italic text-sm font-light lg:text-base'>{`(${data?.email})`}</span>
          {viewOnly === false && (
            <span className='text-gray-500'>
              <EditOutlined onClick={handleEditClick} />
            </span>
          )}
        </div>

        <span
          className={`inline-block rounded-full border-2 capitalize px-3 py-1 text-xs ${
            data?.status === 'active'
              ? 'text-green-500 border-green-500'
              : 'text-red-500 border-red-500'
          }`}
        >
          {data?.status}
        </span>
      </div>
      {showModal.edit && userId && (
        <ModalEditUserForm title='Edit User' defaultValues={data} />
      )}
    </div>
  );
};

export default ProfileHeader;
