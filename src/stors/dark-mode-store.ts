import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { DarkModeActions, DarkModeState } from "../Types";
type Store = DarkModeActions & DarkModeState;
const useDarkModeStore = create<Store>()(
  immer((set) => ({
    darkMode: true,
    changeMode: () =>
      set((state) => {
        state.darkMode = !state.darkMode;
      }),
  }))
);
export default useDarkModeStore;
