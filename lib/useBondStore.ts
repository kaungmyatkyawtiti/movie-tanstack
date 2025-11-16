import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./features/auth/authSlice";
import { createNotiSlice, NotiSlice } from "./features/noti/notiSlice";

export type BoundStore = AuthSlice & NotiSlice;

export const useBoundStore = create<BoundStore>()(
  devtools(
    immer((...args) => ({
      ...createAuthSlice(...args),
      ...createNotiSlice(...args),
    }))
  )
);
