import { create } from "zustand";

type UserState = {
  id: string;
  setId: (newId: string) => void;
};

const userStore = create<UserState>((set) => ({
  id: "",
  setId: (newId) => set((state) => ({ id: newId })),
}));

export default userStore;
