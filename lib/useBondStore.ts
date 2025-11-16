import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./features/auth/authSlice";

export type BoundStore = AuthSlice;

export const useBoundStore = create<BoundStore>()(
  devtools(
    immer((...args) => ({
      ...createAuthSlice(...args),
    }))
  )
);
