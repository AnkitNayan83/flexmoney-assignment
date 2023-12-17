import { Subscription } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "buySubscription" | "changeSlot" | "cancelSubscription";

interface ModalData {
    subscription?: Subscription;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, date?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}));
