import { GetRoomListAPIQueries } from "../types/room";

const queryCache = {
    rooms: (queries: GetRoomListAPIQueries) => ['rooms', queries],
}

export default queryCache;