import { GetRoomListAPIQueries } from "../types/room";

const queryCache = {
    rooms: (queries: GetRoomListAPIQueries) => ['rooms', queries],
    room: (roomId: string) => ['room', roomId],
}

export default queryCache;