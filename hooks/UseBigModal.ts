import React from "react";
import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  content: React.ReactNode | null;
  text: string;
  updateText: (text: string) => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

export const useModalBig = create<ModalStore>((set) => ({
  isOpen: false,
  // content: null,
  text: "",
  updateText: (content: string) => set({ text: content }),
  content: null,
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null }),
}));
