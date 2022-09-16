import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface IRegisterStepStore{
    prevStep: number;
    curStep: number;
    setPrevStep: (step: number) => void;
    setCurStep: (step: number) => void;
    clearAllStep: () => void;

}

const useRegisterStepStore = create<IRegisterStepStore>()(
    devtools(
        (set) => ({
            prevStep: 1,
            curStep: 1,
            setPrevStep: (step) => set(() => ({ prevStep: step })),
            setCurStep: (step) => set(() => ({ curStep: step })),
            clearAllStep: () => set(() => ({ prevStep: 1, curStep: 1}))
        })
    )
)

export { useRegisterStepStore };
