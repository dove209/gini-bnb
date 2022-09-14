import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface authModalState {
    authModalType: string;
    setAuthModalType: (type: string) => void
}

const useAuthModalStore = create<authModalState>()(
    devtools(
        persist((set) => ({
            authModalType: '',
            setAuthModalType: (type) => set(() => ({ authModalType: type }))
        }))
    )
)

export { useAuthModalStore };
