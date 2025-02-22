import { create } from 'zustand';

interface UserState {
  userId: null | number;
  setUserId: (id: number) => void;
}

export const userStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id: number) => set({ userId: id }),
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
