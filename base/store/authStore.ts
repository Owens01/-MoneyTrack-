import { storage } from "@/base/libs/mmkvStore";
import { create } from "zustand";

interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  hydrated: boolean;
  isFirstTime: boolean;
  loadUser: () => void;
  login: (data: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  isFirstTime: true,

  loadUser: () => {
    const storedUser = storage.getString("registeredUser");

    if (storedUser) {
      set({
        user: JSON.parse(storedUser),
        hydrated: true,
        isFirstTime: false,
      });
    } else {
      set({
        user: null,
        hydrated: true,
        isFirstTime: true,
      });
    }
  },

  login: (data) => {
    storage.set("registeredUser", JSON.stringify(data));
    set({
      user: data,
      hydrated: true,
      isFirstTime: false,
    });
  },

  logout: () => {
    storage.remove("registeredUser");
    set({
      user: null,
      hydrated: true,
      isFirstTime: false,
    });
  },
}));
