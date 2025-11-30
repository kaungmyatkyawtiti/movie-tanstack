import { BoundStore } from "@/lib/useBondStore";
import { LoginResponse, LoginUser } from "@/types/auth";
import { apiUrl } from "@/utils/config";
import { StateCreator } from "zustand";

export interface AuthState {
  token: string;
}

export interface AuthActions {
  login: (user: LoginUser) => Promise<LoginResponse>;
  logout: () => void;
}

export type AuthSlice = AuthState & AuthActions

export const initState: AuthState = {
  token: ""
}

export const createAuthSlice: StateCreator<
  BoundStore,
  [["zustand/immer", never], ["zustand/devtools", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initState,
  login: async (user: LoginUser) => {
    try {
      const response = await fetch(apiUrl + `/api/users/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      const json = await response.json();
      console.log("login response", response, "login json", json);

      if (!response.ok) {
        set((state) => { state.token = "" },
          undefined,
          "auth/login"
        );
        throw new Error(json.error || "Invalid user");
      }
      set((state) => { state.token = json.token },
        undefined,
        "auth/login"
      );

      return { token: json.token };
    } catch (err) {
      set((state) => { state.token = "" },
        undefined,
        "auth/login"
      );
      throw err;
    }
  },

  logout: () => {
    set((state) => { state.token = "" },
      undefined,
      "auth/logout"
    );
  },
});
