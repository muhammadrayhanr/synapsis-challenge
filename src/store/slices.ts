import { create } from 'zustand';

interface UserState {
  userId: null | number;
}

interface ActionState {
  getUserId: (id: number) => void;
}

export const userStore = create<UserState & ActionState>((set) => ({
  userId: null,
  getUserId: (id: number) => set({ userId: id }),
}));
