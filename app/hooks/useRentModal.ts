import { create } from 'zustand';
import {SafeListing} from "@/app/types";

interface RentModalStore {
    isOpen: boolean;
    editingListing: SafeListing | null;
    onOpen: (listing?: SafeListing) => void;
    onClose: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    editingListing: null,
    onOpen: (listing: SafeListing | null = null) => set({ isOpen: true, editingListing: listing }),
    onClose: () => set({ isOpen: false, editingListing: null })
}));

export default useRentModal;