import React from 'react';
import ModalComp from '../ModalComp';
import { Flex, Input, Typography } from 'antd';

const EditForm: React.FC = ({title}) => {
  return (
    <ModalComp title={title}>
      <form action='#'>
        <Flex vertical gap={16}>
          <div>
            <Typography.Title level={5}>Name</Typography.Title>
            <Input placeholder='Enter your name' defaultValue='Hello, antd!' />
          </div>
        </Flex>
      </form>
    </ModalComp>
  );
};

export default EditForm;
