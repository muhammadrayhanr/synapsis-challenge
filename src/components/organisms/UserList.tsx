import { deleteUser, getUsers } from '@/api/users';
import { modalStore } from '@/store/slices';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Pagination, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { cardUserStyle } from '@/lib/mocks';
import ModalEditUserForm from '@/components/molecules/Modal/Form/ModalEditUserForm';
import ModalCreateUserForm from '@/components/molecules/Modal/Form/ModalCreateUserForm';
import queryClient from '@/config/providers/queryClient';
import { showNotification } from '@/lib/utils';

const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 6;

  const { showModal, setShowModal } = modalStore();

  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const totalPosts = data?.length || 0;
  const paginatedData = data?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  const submit = useMutation({
    mutationFn: ({ id }: { id: number }) => deleteUser(id),
    onSuccess: () => {
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

  if (isLoading) {
    return (
      <Flex wrap gap='small' justify='center'>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardUserStyle} key={index} />
        ))}
      </Flex>
    );
  }

  const handleEditClick = (user: UserProps) => {
    setSelectedUser(user);
    setShowModal({ edit: true });
  };

  const confirm = (user: UserProps) => {
    submit.mutate({ id: user.id });
  };

  return (
    <Flex vertical align='center' className='py-3'>
      <Flex wrap gap='small' justify='center'>
        {paginatedData.map((user: UserProps) => (
          <Card
            key={user.id}
            style={cardUserStyle}
            actions={[
              <EditOutlined key='edit' onClick={() => handleEditClick(user)} />,
              <Popconfirm
                key='delete'
                title='Delete User'
                description='Are you sure to delete this user?'
                onConfirm={() => confirm(user)}
                okText='Yes'
                cancelText='No'
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <DeleteOutlined onClick={() => setSelectedUser(user)} />
              </Popconfirm>,
            ]}
          >
            <Card.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                />
              }
              title={
                <div className='font-normal text-base flex items-center justify-between'>
                  <span className='truncate whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px] sm:max-w-[200px]'>
                    {user.name}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full hidden lg:block ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              }
              description={
                <span
                  className={`rounded-full border-2 capitalize px-1 text-xs lg:hidden ${
                    user.status === 'active'
                      ? 'text-green-500 border-green-500'
                      : 'text-red-500 border-red-500'
                  }`}
                >
                  {user.status}
                </span>
              }
            />
          </Card>
        ))}
      </Flex>
      <Pagination
        current={currentPage}
        total={totalPosts}
        pageSize={DATA_PER_PAGE}
        onChange={(page) => setCurrentPage(page)}
        className='mt-5'
      />

      {showModal.create && (
        <ModalCreateUserForm title='Create User' defaultValues={null} />
      )}
      {showModal.edit && selectedUser && (
        <ModalEditUserForm title='Edit User' defaultValues={selectedUser} />
      )}
    </Flex>
  );
};

export default UserList;
