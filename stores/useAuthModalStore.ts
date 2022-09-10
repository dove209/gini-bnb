import create from 'zustand';
import { devtools } from 'zustand/middleware';

const authModalStore = (set: any) => ({
    authModalType: '',
    setAuthModalType: (type: string) => set(() => ({ authModalType: type }))
})

const useAuthModalStore = create(devtools(authModalStore));

export { useAuthModalStore };
