import axios from 'axios';

export const getPosts = async () => {
  const response = await axios.get(
    'https://gorest.co.in/public/v2/posts?page=1&per_page=16',
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getUserPosts = async (id: number | null) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v2/users/${id}/posts`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getPostById = async (id: number | null) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v2/posts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getComments = async (id: number | null) => {
  const response = await axios.get(
    `https://gorest.co.in/public/v2/posts/${id}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const createPost = async (
  data: UserProps,
  id: number | null
): Promise<PostProps> => {
  const response = await axios.post(
    `https://gorest.co.in/public/v2/users/${id}/posts`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await axios.delete(`https://gorest.co.in/public/v2/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    },
  });
};

export const createComment = async (
  data: CommentProps,
  id: any
): Promise<PostProps> => {
  const response = await axios.post(
    `https://gorest.co.in/public/v2/posts/${id}/comments`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};
