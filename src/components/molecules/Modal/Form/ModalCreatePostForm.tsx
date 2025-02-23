import React, { useEffect } from 'react';
import ModalComp from '@/components/molecules/Modal/ModalComp';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/config/providers/queryClient';
import Textarea from '@/components/atoms/Textarea';
import { createPost } from '@/api/posts';
import { showNotification } from '@/lib/utils';
import { userStore } from '@/store/slices';

const ModalCreatePostForm: React.FC<ModalFormProps> = ({
  title,
  defaultValues,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const {userId} = userStore()

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const submit = useMutation({
    mutationFn: ({ data }: { data: any }) => createPost(data, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      showNotification(
        'success',
        'Post Created',
        'Post has been successfully created.'
      );
    },
    onError: (error) => {
      showNotification(
        'error',
        'Create Failed',
        'Failed to create post. Please try again.'
      );
      console.log(error)
    },
  });

  const onSubmit = (data: any) => {
    submit.mutate({ data });
  };

  return (
    <ModalComp title={title} handleSubmit={handleSubmit(onSubmit)}>
      <Flex vertical gap={16}>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Title' type='label' />
          <Input
            control={control}
            name='title'
            type='text'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter post title'
          />
        </div>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Content' type='label' />
          <Textarea
            control={control}
            name='body'
            type='text'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter post content'
          />
        </div>
      </Flex>
    </ModalComp>
  );
};

export default ModalCreatePostForm;
