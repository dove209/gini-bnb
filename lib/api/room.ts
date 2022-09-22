import axios from "axios";
import { RegisterRoomState, StoredRoomType } from '../../types/room';

/** 숙소 등록 API */
export const registerRoomAPI = (body: RegisterRoomState ) => {
    return axios.post<StoredRoomType>('/api/rooms', body);
}