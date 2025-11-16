import { BoundStore } from "@/lib/useBondStore";
import { StateCreator } from "zustand";

export interface NotiState {
  message: string;
}

export interface NotiActions {
  showNoti: (msg: string) => void;
  hideNoti: () => void;
}

export type NotiSlice = NotiState & NotiActions

export const initState: NotiState = {
  message: ""
}

export const createNotiSlice: StateCreator<
  BoundStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  NotiSlice
> = (set) => ({
  ...initState,
  showNoti: (msg: string) => {
    set((state) => { state.message = msg },
      undefined,
      "noti/showNoti"
    );
  },
  hideNoti: () => {
    set((state) => { state.message = "" },
      undefined,
      "noti/hideNoti"
    );
  },
});
