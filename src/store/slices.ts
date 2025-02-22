import { create } from 'zustand';

export const userStore = create<UserState>((set) => ({
  userId: 7373649,
  setUserId: (id: number) => set({ userId: id }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

export const modalStore = create<ModalState>((set) => ({
  showModal: { create: false, edit: false },
  setShowModal: (value) =>
    set(() => ({
      showModal: { create: false, edit: false, ...value },
    })),
}));

