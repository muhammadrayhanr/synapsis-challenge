import { create } from 'zustand';

export const userStore = create<UserState>((set) => ({
  userId: 7373650,
  setUserId: (id: number | null) => set({ userId: id }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const modalStore = create<ModalState>((set) => ({
  showModal: { createUser: false, createPost: false, edit: false },
  setShowModal: (value) =>
    set(() => ({
      showModal: {
        createUser: false,
        createPost: false,
        edit: false,
        ...value,
      },
    })),
}));
