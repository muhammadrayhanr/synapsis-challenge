import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get(
    'https://gorest.co.in/public/v2/users?page=1&per_page=24',
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const getUserDetail = async (id: number | null): Promise<UserProps> => {
  const response = await axios.get(
    `https://gorest.co.in//public/v2/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const createUser = async (data: UserProps): Promise<UserProps> => {
  const response = await axios.post(
    'https://gorest.co.in/public/v2/users',
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const editUser = async (
  data: UserProps,
  id: number
): Promise<UserProps> => {
  const response = await axios.put(
    `https://gorest.co.in/public/v2/users/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};

export const deleteUser = async (id: number): Promise<UserProps> => {
  const response = await axios.delete(
    `https://gorest.co.in/public/v2/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_TOKEN}`,
      },
    }
  );
  return response.data;
};
