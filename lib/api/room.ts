import axios from ".";
import { RegisterRoomState, StoredRoomType, GetRoomListAPIQueries } from '../../types/room';
import { makeQueryString } from "../utils";

/** 숙소 등록 API */
export const registerRoomAPI = (body: RegisterRoomState ) => {
    return axios.post<StoredRoomType>('/api/rooms', body);
}

/** 숙소 리스트 불러오기 API */
export const getRoomListAPI = (queries: GetRoomListAPIQueries): Promise<StoredRoomType[]> => {
    return axios.get(makeQueryString('/api/rooms', queries));
}

/** 숙소 상세 불러오기 API */
export const getRoomAPI = (roomId: string): Promise<StoredRoomType> => {
    return axios.get(`/api/rooms/${roomId}`);
}