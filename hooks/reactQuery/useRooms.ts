import { useQuery } from "@tanstack/react-query";
import { getRoomListAPI } from "../../lib/api/room";
import queryCache from "../../queryCache";
import { GetRoomListAPIQueries } from "../../types/room";

/** [GET]: (조건)검색된 숙소 리스트 */
export const useRooms = (queries: GetRoomListAPIQueries) => {
    return useQuery(queryCache.rooms(queries), () => getRoomListAPI(queries), {
        staleTime: 10 * 1000, // 10초 후 refetch
    })
}