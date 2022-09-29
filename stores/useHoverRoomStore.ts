import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface HoveredRoomState {
    hoveredRoomId: string | null;
    setHoveredRoomId: (index: string | null) => void
}

const useHoveredRoomStore = create<HoveredRoomState>()(
    devtools(
        (set) => ({
            hoveredRoomId: null,
            setHoveredRoomId: (roomId) => set(() => ({ hoveredRoomId: roomId }))
        })
    )
)

export { useHoveredRoomStore };
