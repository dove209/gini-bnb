import { AxiosError } from 'axios';
import { useInfiniteQuery, useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as roomAPI from "../../lib/api/room";
import queryCache from "../../queryCache";
import { StoredRoomType, GetRoomListAPIQueries, infiniteQueryAllRooms } from '../../types/room';


/** [GET]: 모든 숙소 리스트(메인 페이지) */
export const useAllRooms = (type: 'list' | 'map' ) => {
    return useInfiniteQuery<infiniteQueryAllRooms, AxiosError>(queryCache.allRooms(type), ({ pageParam = 1 }) => roomAPI.getAllRoomListAPI(pageParam, type), {
        staleTime: 30 * 1000,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.hasMore) return lastPage.nextPage;
            return undefined;
        },
    });
}

/** [GET]: 나의 등록 숙소 리스트 불러오기 */
export const useMyRooms = (userId: string, options?: UseQueryOptions<StoredRoomType[], AxiosError>) => {
    return useQuery<StoredRoomType[], AxiosError>(queryCache.myRooms(userId), () => roomAPI.getMyRoomsListAPI(userId), {
        ...options,
        enabled: !!userId
    })
}


/** [GET]: (조건)검색된 숙소 리스트 */
export const useRooms = (queries: GetRoomListAPIQueries, options?: UseQueryOptions<StoredRoomType[], AxiosError>) => {
    return useQuery<StoredRoomType[], AxiosError>(queryCache.rooms(queries), () => roomAPI.getRoomListAPI(queries), {
        ...options,
        staleTime: 30 * 1000, // 10초 후 refetch
        enabled: !!queries,   //id가 존재할 때만 쿼리 요청
    })
}

/** [GET]: 숙소 상세 정보 */
export const useRoom = (roomId: string, options?: UseQueryOptions<StoredRoomType, AxiosError>) => {
    return useQuery<StoredRoomType, AxiosError>(queryCache.room(roomId), () => roomAPI.getRoomAPI(roomId), {
        ...options,
        staleTime: 30 * 1000,
        enabled: !!roomId
    })
}

/** [POST]: 숙소 등록하기 */
export const usePostRoom = () => {
    return useMutation(roomAPI.registerRoomAPI)
}

/** [DELETE]: 숙소 등록 취소 */
export const useRemoveRoom = () => {
    return useMutation(roomAPI.removeRoomAPI);
}