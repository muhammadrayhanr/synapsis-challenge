import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { modalStore } from '@/store/slices';

const ModalComp: React.FC<ModalCompProps> = ({
  children,
  title,
  handleSubmit,
  isDisabled
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { showModal, setShowModal } = modalStore();

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleSubmit();
    setConfirmLoading(false);
    setShowModal({ createPost: false, createUser: false, edit: false });
  };

  const handleCancel = () => {
    setShowModal({ createUser: false, createPost: false, edit: false });
  };

  return (
    <Modal
      title={title}
      open={showModal.createUser || showModal.createPost || showModal.edit}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key='submit'
          type='primary'
          loading={confirmLoading}
          onClick={handleOk}
          disabled={isDisabled}
        >
          Submit
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </Modal>
  );
};

export default ModalComp;
