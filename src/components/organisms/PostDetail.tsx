import React from 'react';
import CommentHeader from '@/components/molecules/Comment/CommentHeader';
import CommentSection from '@/components/molecules/Comment/CommentSection';

const PostDetail: React.FC = () => {
  return (
    <div className='bg-white border-2 rounded-lg items-center p-6'>
      <CommentHeader />
      <CommentSection />
    </div>
  );
};

export default PostDetail;
