import { create } from "zustand";

type SaveStatus = "idle" | "saving" | "success" | "error";

type ModalState = {
  isOpen: boolean;
  title: string;
  text: string;
  saveStatus: SaveStatus;
  isTextUpdated: boolean;
  onSave: () => Promise<void>;
  openModal: (title: string, text: string, onSave: () => Promise<void>) => void;
  closeModal: () => void;
  setText: (text: string) => void;
  setSaveStatus: (status: SaveStatus) => void;
};

const useModalBig = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  text: "",
  saveStatus: "idle",
  isTextUpdated: false,
  onSave: async () => {},
  openModal: (title, text, onSave) =>
    set({
      isOpen: true,
      title,
      text,
      onSave,
      saveStatus: "idle",
      isTextUpdated: false,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      text: "",
      saveStatus: "idle",
      isTextUpdated: false,
    }),
  setText: (text) => set({ text, isTextUpdated: true }),
  setSaveStatus: (status) => set({ saveStatus: status }),
}));

export { useModalBig };
export type { SaveStatus };
