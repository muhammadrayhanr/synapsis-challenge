import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('https://gorest.co.in/public/v2/users', {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
    },
  });
  return response.data;
};
