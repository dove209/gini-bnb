import axios from ".";
import { RegisterRoomState, StoredRoomType, GetRoomListAPIQueries, infiniteQueryAllRooms } from '../../types/room';
import { makeQueryString } from "../utils";

/** 숙소 등록 API */
export const registerRoomAPI = async (body: RegisterRoomState ): Promise<StoredRoomType> => {
    const { data } = await axios.post('/api/rooms', body);
    return data;
}

/** 모든 숙소 리스트 불러오기 API */
export const getAllRoomListAPI = async (pageParam: number, type: 'list' | 'map'): Promise<infiniteQueryAllRooms> => {
    const limit = 10;
    const { data } = await axios.get('/api/allRooms', {
        params: {
            pageParam,
            limit,
            type
        }
    });
    return data;
}

/** (조건queries)검색된 숙소 리스트 불러오기 API */
export const getRoomListAPI = async (queries: GetRoomListAPIQueries): Promise<StoredRoomType[]> => {
    const { data } = await axios.get(makeQueryString('/api/rooms', queries));
    return data;
}

/** 숙소 상세 불러오기 API */
export const getRoomAPI = async (roomId: string): Promise<StoredRoomType> => {
    const { data } = await axios.get(`/api/rooms/${roomId}`);
    return data;
}