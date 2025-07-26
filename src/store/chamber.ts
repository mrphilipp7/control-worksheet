import { create } from 'zustand';
import type { Chamber } from '@/types';

type State = {
  chamberRows: Chamber[];
};

type Action = {
  setChamberRows: (chamberRows: State['chamberRows']) => void;
};

export const useChamberStore = create<State & Action>((set) => ({
  chamberRows: [],
  setChamberRows: (chamberRows) => set(() => ({ chamberRows })),
}));
