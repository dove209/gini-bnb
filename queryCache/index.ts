import { GetRoomListAPIQueries } from "../types/room";

const queryCache = {
    allRooms: (type: 'list' | 'map') => ['allRooms', type],
    rooms: (queries: GetRoomListAPIQueries) => ['rooms', queries],
    room: (roomId: string) => ['room', roomId],
}

export default queryCache;