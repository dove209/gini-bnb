import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RegisterRoomState } from '../types/room';


interface IRegisterRoomStore extends RegisterRoomState {
    setRegisterRoom: (registerRoom: RegisterRoomState) => void
}

const useRegisterRoomStore = create<IRegisterRoomStore>()(
    devtools(
        persist((set) => ({
            largeBuildingType: null,
            buildingType: null,
            roomType: null,
            isSetUpForGuest: null,
            setRegisterRoom: (registerRoom) => set((state) => ({ ...state,...registerRoom }))
        }))
    )
)

export { useRegisterRoomStore };
