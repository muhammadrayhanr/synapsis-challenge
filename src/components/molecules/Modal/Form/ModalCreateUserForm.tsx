import React, { useEffect } from 'react';
import ModalComp from '@/components/molecules/Modal/ModalComp';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/api/users';
import queryClient from '@/config/providers/queryClient';
import { genderList, statusList } from '@/lib/mocks';
import Dropdown from '@/components/atoms/Dropdown';
import { showNotification } from '@/lib/utils';
import { userStore } from '@/store/slices';

const ModalCreateUserForm: React.FC<ModalFormProps> = ({
  title,
  defaultValues,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const { setUserId } = userStore();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submit = useMutation({
    mutationFn: ({ data }: { data: any }) => createUser(data),
    onSuccess: (newUser) => {
      setUserId(newUser.id);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      showNotification(
        'success',
        'User Created',
        'User has been successfully created.'
      );
    },
    onError: () => {
      showNotification(
        'error',
        'Delete Failed',
        'Failed to create user. Please try again.'
      );
    },
  });

  const onSubmit = (data: any) => {
    submit.mutate({ data });
  };

  return (
    <ModalComp title={title} handleSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={16}>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Name' type='label' />
          <Input
            control={control}
            name='name'
            type='text'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter user name'
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Email' type='label' />
          <Input
            control={control}
            name='email'
            type='email'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter user email'
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Gender' type='label' />
          <Dropdown
            control={control}
            name='gender'
            options={genderList.flat()}
            placeholder='Select Gender'
            className='border gap-8 border-[#AFAFAF] bg-white rounded-[5px] py-[10px] px-[11px] w-full text-[12px] items-center'
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Status' type='label' />
          <Dropdown
            control={control}
            name='status'
            options={statusList.flat()}
            placeholder='Select Status'
            className='border gap-8 border-[#AFAFAF] bg-white rounded-[5px] py-[10px] px-[11px] w-full text-[12px] items-center'
          />
        </div>
      </Flex>
    </ModalComp>
  );
};

export default ModalCreateUserForm;
