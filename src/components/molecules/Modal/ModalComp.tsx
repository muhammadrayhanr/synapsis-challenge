import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { modalStore } from '@/store/slices';

interface ModalCompProps {
  children: React.ReactNode;
  title: string;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

const ModalComp: React.FC<ModalCompProps> = ({ children, title, handleSubmit }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { showModal, setShowModal } = modalStore();

  const handleOk = async () => {
    setConfirmLoading(true);
    await handleSubmit();
    setConfirmLoading(false);
    setShowModal({ create: false, edit: false });
  };

  const handleCancel = () => {
    setShowModal({ create: false, edit: false });
  };

  return (
    <Modal
      title={title}
      open={showModal.create || showModal.edit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

export default ModalComp;
