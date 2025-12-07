import { create } from "zustand";

export const useStore = create((set) => ({
  loading: false,
  modal: null,

  setLoading: (state) => set({ loading: state }),
  openModal: (modalName) => set({ modal: modalName }),
  closeModal: () => set({ modal: null })
}));
