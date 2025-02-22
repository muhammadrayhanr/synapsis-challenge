import { create } from 'zustand';

interface UserState {
  userId: null | number;
  setUserId: (id: number) => void;
  selectedUser: null | any;
  setSelectedUser: (user: any) => void;
}

export const userStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id: number) => set({ userId: id }),
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));

interface ModalState {
  showModal: {
    create: boolean;
    edit: boolean;
  };
  setShowModal: (value: Partial<ModalState['showModal']>) => void;
}

export const modalStore = create<ModalState>((set) => ({
  showModal: { create: false, edit: false },
  setShowModal: (value) =>
    set((prev) => ({ showModal: { ...prev.showModal, ...value } })),
}));
