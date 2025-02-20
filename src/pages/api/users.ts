import axios from 'axios';

export const getUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

export const createUser = async (user: any) => {
    console.log(user)
}