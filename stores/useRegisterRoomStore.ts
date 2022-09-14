import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RegisterRoomState } from '../types/room';


interface IRegisterRoomStore extends RegisterRoomState {
    setRegisterRoom: () => void
}

const useRegisterRoomStore = create<IRegisterRoomStore>()(
    devtools(
        persist((set) => ({
            largeBuildingType: null,
            buildingType: null,
            roomType: null,
            isSetUpForGuest: null,
            setRegisterRoom: () => set(() => ({ }))
        }))
    )
)

export { useRegisterRoomStore };
