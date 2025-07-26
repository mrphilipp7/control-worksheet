import { create } from 'zustand';

type State = {
  isShiftNight: boolean; // false is day night is true
};

type Action = {
  setIsShiftNight: (shift: State['isShiftNight']) => void;
};

export const useShiftStore = create<State & Action>((set) => ({
  isShiftNight: false,
  setIsShiftNight: (isShiftNight) => set(() => ({ isShiftNight })),
}));
