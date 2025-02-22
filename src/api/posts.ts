import axios from 'axios';

export const getPosts = async () => {
  const response = await axios.get('https://gorest.co.in/public/v2/posts', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    },
  });
  return response.data;
};

export const createPost = async (data: UserProps): Promise<PostProps> => {
  const response = await axios.post('https://gorest.co.in/public/v2/users/7373645/posts', data, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    },
  });
  return response.data;
};
