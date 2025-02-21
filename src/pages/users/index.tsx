import React, { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Modal, Pagination } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/api/users';
import { userStore } from '@/store/slices';

const Users: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const DATA_PER_PAGE = 6;
  const userId = userStore((state) => state.userId);
  const getUserId = userStore((state) => state.getUserId);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);

  // State untuk cek apakah di mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Set true jika layar < 768px
    };

    handleResize(); // Jalankan saat pertama kali
    window.addEventListener('resize', handleResize); // Update saat resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const cardStyle: React.CSSProperties = {
    width: '100%',
    minWidth: 260,
    maxWidth: '40%',
    border: '3px solid #f0f0f0',
  };

  const totalPosts = data?.length || 0;
  const paginatedData = data?.slice(
    (currentPage - 1) * DATA_PER_PAGE,
    currentPage * DATA_PER_PAGE
  );

  if (isLoading) {
    return (
      <Flex wrap gap='small' justify='center'>
        {[...Array(DATA_PER_PAGE)].map((_, index) => (
          <Card loading={true} style={cardStyle} key={index} />
        ))}
      </Flex>
    );
  }

  const handleEditClick = (user: UserProps) => {
    getUserId(user.id);
    if (isMobile) {
      setSelectedUser(user);
      setIsModalOpen(true);
    } else {
      console.log('Edit User:', userId);
    }
  };

  return (
    <Flex vertical align='center' className='py-3'>
      <Flex wrap gap='small' justify='center'>
        {paginatedData.map((user: UserProps) => (
          <Card
            key={user.id}
            style={cardStyle}
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

      {/* Modal Edit */}
      <Modal
        title='Edit User'
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>Edit user dengan ID: {selectedUser?.id}</p>
        <p>Nama: {selectedUser?.name}</p>
      </Modal>
    </Flex>
  );
};

export default Users;
