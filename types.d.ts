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
  postData: PostProps[];
  postDataLoading: boolean;
}

interface UsersProps {
  userData: UserProps[];
  userDataLoading: boolean;
}

interface ModalCompProps {
  children: React.ReactNode;
  title: string;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isDisabled: boolean;
}

interface ModalFormProps {
  title: string;
  defaultValues: any;
}

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  control: Control<any>;
  name: string;
  options: Option[];
  className?: string;
  placeholder?: string;
}

interface InputProps {
  name: string;
  control: Control;
  className?: string;
  placeholder?: string;
  [key: string]: any;
}

interface TextProps {
  type?: string;
  text: string;
  className?: string;
  [key: string]: any;
}

interface UserState {
  userId: null | number;
  setUserId: (id: number | null) => void;
  selectedUser: null | any;
  setSelectedUser: (user: any) => void;
}

interface ModalState {
  showModal: {
    createUser: boolean;
    createPost: boolean;
    edit: boolean;
  };
  setShowModal: (value: Partial<ModalState['showModal']>) => void;
}

interface TextareaProps {
  className?: string;
  control: any;
  name: string;
  value?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  [key: string]: any;
}

interface ProfileProps {
  userId: any;
  viewOnly: boolean;
}

interface CommentProps extends PostProps {
  name: string;
}
