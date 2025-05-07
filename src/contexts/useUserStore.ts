import { create } from 'zustand';

type UserStore = {
  name: string;
  balance: number;
  transferCount: number;
  setName: (name: string) => void;
  setBalance: (balance: number) => void;
  setTransferCount: (count: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  name: '',
  balance: 0,
  transferCount: 0,
  setName: (name) => set({ name }),
  setBalance: (balance) => set({ balance }),
  setTransferCount: (count) => set({ transferCount: count }),
}));
