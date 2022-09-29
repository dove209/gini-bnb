import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRoomAPI, getRoomListAPI, registerRoomAPI } from "../../lib/api/room";
import queryCache from "../../queryCache";
import { StoredRoomType, GetRoomListAPIQueries } from '../../types/room';


/** [GET]: (조건)검색된 숙소 리스트 */
export const useRooms = (queries: GetRoomListAPIQueries) => {
    return useQuery<{ data : StoredRoomType[] }, AxiosError>(queryCache.rooms(queries), () => getRoomListAPI(queries), {
        staleTime: 30 * 1000, // 10초 후 refetch
        enabled: !!queries,   //id가 존재할 때만 쿼리 요청
    })
}

/** [GET]: 숙소 상세 정보 */
export const useRoom = (roomId: string) => {
    return useQuery<StoredRoomType, AxiosError>(queryCache.room(roomId), () => getRoomAPI(roomId), {
        staleTime: 30 * 1000,
        enabled: !!roomId
    })
}

/** [POST]: 숙소 등록하기 */
export const usePostRoom = () => {
    return useMutation(registerRoomAPI)
}