import { create } from "zustand";

type AddStepModalState = {
  isOpen: boolean;
  componentPath: string | null;
  openModal: (componentPath: string) => void;
  closeModal: () => void;
};

export const useAddStepModalStore = create<AddStepModalState>((set) => ({
  isOpen: false,
  componentPath: null,
  openModal: (componentPath) => set({ isOpen: true, componentPath }),
  closeModal: () => set({ isOpen: false, componentPath: null }),
}));
