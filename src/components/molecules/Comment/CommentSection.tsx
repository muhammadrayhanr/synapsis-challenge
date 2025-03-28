import { createComment, getComments } from '@/api/posts';
import { getUserDetail } from '@/api/users';
import Textarea from '@/components/atoms/Textarea';
import queryClient from '@/config/providers/queryClient';
import { commentSchema } from '@/lib/schemas';
import { showNotification } from '@/lib/utils';
import { userStore } from '@/store/slices';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const CommentSection: React.FC = () => {
  const { query } = useRouter();
  const router = useRouter();

  const { userId } = userStore();

  useEffect(() => {
    if (!userId) {
      router.push('/');
      showNotification(
        'error',
        'Forbidden Act',
        'You have to be a user first. Please try again.'
      );
    }
  }, [userId, router]);

  const { data: user } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserDetail(userId),
    enabled: !!userId,
  });

  const { data } = useQuery({
    queryKey: ['comments', query.id],
    queryFn: () => getComments(Number(query.id)),
    enabled: !!query.id,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      body: '',
    },
    resolver: yupResolver(commentSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: ({ data }: { data: any }) => createComment(data, query.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      showNotification(
        'success',
        'Comment Created',
        'Comment has been successfully created.'
      );
      reset();
    },
    onError: () => {
      showNotification(
        'error',
        'Create Failed',
        'Failed to create comment. Please try again.'
      );
    },
  });

  const submit = (data: any) => {
    mutation.mutate({ data });
  };

  return (
    <div className='my-8 flex flex-col'>
      <span className='text-lg font-semibold mb-2'>
        {data?.length} COMMENT{data?.length > 1 && 'S'}
      </span>

      <form onSubmit={handleSubmit(submit)}>
        <Textarea
          control={control}
          name='body'
          type='text'
          className='p-[8px] rounded-[5px] w-full border-2 border-[#AFAFAF] text-[12px] outline-none'
          placeholder='Enter your comment'
        />
        {errors.body && (
          <p className='text-red-500 text-sm'>{String(errors.body.message)}</p>
        )}
        <div className='flex justify-end'>
          <Button
            type='primary'
            htmlType='submit'
            className='text-end mt-2 mb-4'
            disabled={!isValid}
          >
            Submit
          </Button>
        </div>
      </form>

      {data?.map((comment: CommentProps) => (
        <div
          className='flex flex-col border-2 gap-2 rounded-lg w-full mt-4 p-4'
          key={comment?.id}
        >
          <span className='text-sm font-semibold'>{comment?.name}</span>
          <span className='text-sm'>{`-> ${comment?.body}`}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
