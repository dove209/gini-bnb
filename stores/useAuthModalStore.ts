import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface authModalState {
    authModalType: string;
    setAuthModalType: (type: string) => void
}

const useAuthModalStore = create<authModalState>()(
    devtools(
        (set) => ({
            authModalType: '',
            setAuthModalType: (type) => set(() => ({ authModalType: type }))
        })
    )
)

export { useAuthModalStore };
