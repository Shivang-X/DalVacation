import { create } from "zustand";

// Define the store
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () =>
    set({
      user: {
        userId: "",
        username: "",
        email: "",
        role: "",
      },
    }),
}));