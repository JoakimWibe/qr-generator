import { create } from 'zustand';

interface QrCodeStore {
    imageUrl: string | null;
    setImageUrl: (imageUrl: string | null) => void;
}

export const useQrCodeStore = create<QrCodeStore>((set) => ({
    imageUrl: null,
    setImageUrl: (imageUrl) => set({imageUrl})
}))