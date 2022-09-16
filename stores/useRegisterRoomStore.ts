import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RegisterRoomState } from '../types/room';

interface IRegisterRoomStore extends RegisterRoomState {
    setRegisterRoom: (registerRoom: RegisterRoomState) => void
}

const useRegisterRoomStore = create<IRegisterRoomStore>()(
    devtools(
        // 새로고침 해도 유지된다.
        persist((set) => ({
            largeBuildingType: null,
            buildingType: null,
            roomType: null,
            maximumGuestCount: 1,
            bedroomCount: 1,
            bedCount: 0,
            bathroomCount: 0.5,
            bathroomType: 'private',
            setRegisterRoom: (registerRoom) => set(() => ({ ...registerRoom }))
        }))
    )
)

export { useRegisterRoomStore };
