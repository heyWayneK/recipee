import { create } from "zustand";

type SaveStatus = "idle" | "saving" | "success" | "error";
export type DbExpectedType = "uuid" | "html" | "plaintext" | "int" | "decimal";

type ModalState = {
  isOpen: boolean;
  title: string;
  text: string;
  saveStatus: SaveStatus;
  isTextUpdated: boolean;
  dbExpectedType: DbExpectedType;
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
  dbExpectedType: "plaintext",
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
  // Set the expected type of the text (e.g., "html", "plaintext", etc.)
  setType: (status: DbExpectedType) => set({ dbExpectedType: status }),
}));

export { useModalBig };
export type { SaveStatus };
