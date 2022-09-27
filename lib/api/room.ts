import axios from ".";
import { RegisterRoomState, StoredRoomType, RoomType, GetRoomListAPIQueries } from '../../types/room';
import { makeQueryString } from "../utils";

/** 숙소 등록 API */
export const registerRoomAPI = (body: RegisterRoomState ) => {
    return axios.post<StoredRoomType>('/api/rooms', body);
}

/** 숙소 리스트 불러오기 API */
export const getRoomListAPI = (queries: GetRoomListAPIQueries) => {
    return axios.get<RoomType[]>(makeQueryString('/api/rooms', queries));
}
