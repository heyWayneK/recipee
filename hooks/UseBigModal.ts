import { create } from "zustand";

type SaveStatus = "idle" | "saving" | "success" | "error";

type ModalState = {
  isOpen: boolean;
  title: string;
  text: string;
  saveStatus: SaveStatus;
  onSave: () => Promise<void>;
  openModal: (
    title: string,
    text: string,
    onSave: () => Promise<void>
  ) => void;
  closeModal: () => void;
  setText: (text: string) => void;
  setSaveStatus: (status: SaveStatus) => void;
};

const useModalBig = create<ModalState>((set) => ({
  isOpen: false,
  title: "",
  text: "",
  saveStatus: "idle",
  onSave: async () => {},
  openModal: (title, text, onSave) =>
    set({
      isOpen: true,
      title,
      text,
      onSave,
      saveStatus: "idle",
    }),
  closeModal: () =>
    set({
      isOpen: false,
      title: "",
      text: "",
      saveStatus: "idle",
    }),
  setText: (text) => set({ text }),
  setSaveStatus: (status) => set({ saveStatus: status }),
}));

export { useModalBig };
export type { SaveStatus };
