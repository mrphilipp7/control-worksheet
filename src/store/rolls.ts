import { create } from 'zustand';

type State = {
  rolls: {
    rollOutcome: number;
    modifierBonus: number;
    weapon: string;
    naturalRole: number | null;
  }[];
};

type Action = {
  setRolls: (roll: State['rolls']) => void;
};

export const useRollStore = create<State & Action>((set) => ({
  rolls: [],
  setRolls: (rolls) => set(() => ({ rolls })),
}));
