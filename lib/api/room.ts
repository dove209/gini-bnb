import axios from ".";
import { RegisterRoomState, StoredRoomType, GetRoomListAPIQueries } from '../../types/room';
import { makeQueryString } from "../utils";

/** 숙소 등록 API */
export const registerRoomAPI = (body: RegisterRoomState ): Promise<StoredRoomType> => {
    return axios.post('/api/rooms', body);
}

/** 모든 숙소 리스트 불러오기 API */
export const getAllRoomListAPI = (): Promise<{ data: StoredRoomType[] }> => {
    return axios.get('/api/allRooms');
}

/** (조건queries)검색된 숙소 리스트 불러오기 API */
export const getRoomListAPI = (queries: GetRoomListAPIQueries): Promise<{data: StoredRoomType[]}> => {
    return axios.get(makeQueryString('/api/rooms', queries));
}

/** 숙소 상세 불러오기 API */
export const getRoomAPI = (roomId: string): Promise<{data: StoredRoomType}> => {
    return axios.get(`/api/rooms/${roomId}`);
}