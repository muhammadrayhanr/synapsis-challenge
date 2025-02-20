interface PostProps {
    id: number;
    user_id: number;
    title: string;
    body: string;
  }
  
  interface UserProps {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
  }
  
  interface ContentProps {
    userData: UserProps[];
    userDataLoading: boolean;
  }