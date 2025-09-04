import { create } from "zustand";

type AddPlatingQtyModalState = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const useAddPlatingQtyModalStore = create<AddPlatingQtyModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
