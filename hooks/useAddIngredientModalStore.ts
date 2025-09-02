import { create } from "zustand";

type AddIngredientModalState = {
  isOpen: boolean;
  componentPath: string | null;
  openModal: (componentPath: string) => void;
  closeModal: () => void;
};

export const useAddIngredientModalStore = create<AddIngredientModalState>((set) => ({
  isOpen: false,
  componentPath: null,
  openModal: (componentPath) => set({ isOpen: true, componentPath }),
  closeModal: () => set({ isOpen: false, componentPath: null }),
}));
