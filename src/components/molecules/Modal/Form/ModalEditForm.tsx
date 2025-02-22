import React from 'react';
import ModalComp from '@/components/molecules/Modal/ModalComp';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import Dropdown from '@/components/atoms/Dropdown';
import { genderList, statusList } from '@/lib/mocks';

const ModalEditForm: React.FC<ModalEditFormProps> = ({ title, defaultValues }) => {
  const {
    control,
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <ModalComp title={title} handleSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={16}>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text="Name" type="label" />
          <Input
            control={control}
            name="name"
            type="text"
            className="p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none"
            placeholder="Enter user name"
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text="Email" type="label" />
          <Input
            control={control}
            name="email"
            type="email"
            className="p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none"
            placeholder="Enter user email"
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text="Gender" type="label" />
          <Dropdown
            control={control}
            name="gender"
            options={genderList.flat()}
            placeholder="Select Gender"
            className="border gap-8 border-[#AFAFAF] bg-white rounded-[5px] py-[10px] px-[11px] w-full text-[12px] items-center"
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text="Status" type="label" />
          <Dropdown
            control={control}
            name="status"
            options={statusList.flat()}
            placeholder="Select Status"
            className="border gap-8 border-[#AFAFAF] bg-white rounded-[5px] py-[10px] px-[11px] w-full text-[12px] items-center"
          />
        </div>
      </Flex>
    </ModalComp>
  );
};

export default ModalEditForm;
