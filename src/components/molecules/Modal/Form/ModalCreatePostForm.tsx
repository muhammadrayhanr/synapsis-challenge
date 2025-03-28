import React, { useEffect } from 'react';
import ModalComp from '@/components/molecules/Modal/ModalComp';
import { Flex } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/config/providers/queryClient';
import Textarea from '@/components/atoms/Textarea';
import { createPost } from '@/api/posts';
import { showNotification } from '@/lib/utils';
import { userStore } from '@/store/slices';
import { createPostSchema } from '@/lib/schemas';

const ModalCreatePostForm: React.FC<ModalFormProps> = ({
  title,
  defaultValues,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    resolver: yupResolver(createPostSchema),
    mode: 'onChange',
  });

  const { userId } = userStore();

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
    onError: () => {
      showNotification(
        'error',
        'Create Failed',
        'Failed to create post. Please try again.'
      );
    },
  });

  const onSubmit = (data: any) => {
    submit.mutate({ data });
  };

  return (
    <ModalComp title={title} handleSubmit={handleSubmit(onSubmit)} isDisabled={!isValid}>
      <Flex vertical gap={16}>
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Title' type='label' required />
          <Input
            control={control}
            name='title'
            type='text'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter post title'
          />
        </div>
        {errors.title && (
          <p className='text-red-500 text-sm'>
            {String(errors.title.message)}
          </p>
        )}
        <div className={'grid grid-cols-[3fr_7fr] gap-[20px] items-center'}>
          <Text text='Content' type='label' required />
          <Textarea
            control={control}
            name='body'
            type='text'
            className='p-[8px] rounded-[5px] border border-[#AFAFAF] text-[12px] outline-none'
            placeholder='Enter post content'
          />
        </div>
        {errors.body && (
          <p className='text-red-500 text-sm'>{String(errors.body.message)}</p>
        )}
      </Flex>
    </ModalComp>
  );
};

export default ModalCreatePostForm;
