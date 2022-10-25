import axios from ".";
import { MakeReservationAPIBody, StoredReservation } from "../../types/reservation";

/** 나의 숙소 예약 현황 리스트 API */
export const getMyReservationListAPI = async (userId: string): Promise<StoredReservation[]> => {
    const { data } = await axios.get(`/api/reservation?userId=${userId}`);
    return data;
}


/** 숙소 예약하기 API */
export const makeReservationAPI = async (body: MakeReservationAPIBody): Promise<StoredReservation> => {
    const { data } = await axios.post(`/api/reservation`, body);
    return data;
}


/** 숙소 예약 취소하기 API */
export const cancelReservationAPI = async (roomId: string): Promise<boolean> => {
     const { data } = await axios.delete(`/api/reservation`, {
        data: {
            roomId
        }
    });
    return data;
}