import { GetRoomListAPIQueries } from "../types/room";

const queryCache = {
    allRooms: (type: 'list' | 'map') => ['allRooms', type] as const,
    rooms: (queries: GetRoomListAPIQueries) => ['rooms', queries] as const,
    room: (roomId: string) => ['room', roomId] as const,
    myReservation: (userId: string) => ['myReservation', userId] as const,
}

export default queryCache;