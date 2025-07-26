import { create } from 'zustand';
import type { Degas } from '@/types';

type State = {
  degasRows: Degas[];
};

type Action = {
  setDegasRows: (chamberRows: State['degasRows']) => void;
};

export const useDegasStore = create<State & Action>((set) => ({
  degasRows: [],
  setDegasRows: (degasRows) => set(() => ({ degasRows })),
}));
