'use client';

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { modalStore } from '@/store/slices';

interface ModalFormProps {
  children: React.ReactNode;
  title: string;
}

const ModalComp: React.FC<ModalFormProps> = ({ children, title }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { showModal, setShowModal } = modalStore();

  const handleOk = () => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setShowModal({ create: false, edit: false });
  };

  return (
    <Modal
      title={title}
      open={showModal.create || showModal.edit}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key='back' onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

export default ModalComp;
