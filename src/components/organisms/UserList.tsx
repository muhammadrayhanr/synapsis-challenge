import { getUsers } from '@/api/users';
import { modalStore, userStore } from '@/store/slices';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { cardUserStyle } from '@/lib/mocks';
import ModalEditUserForm from '@/components/molecules/Modal/Form/ModalEditUserForm';
import ModalCreateUserForm from '@/components/molecules/Modal/Form/ModalCreateUserForm';

const UserList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 8;

  const setUserId = userStore((state) => state.setUserId);
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
    setUserId(user.id);
    setSelectedUser(user);
    setShowModal({ edit: true });
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
              <DeleteOutlined key='delete' />,
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
