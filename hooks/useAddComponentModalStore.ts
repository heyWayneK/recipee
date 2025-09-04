import { create } from "zustand";

type AddComponentModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useAddComponentModalStore = create<AddComponentModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
