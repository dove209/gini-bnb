import axios from ".";
import { MakeReservationAPIBody, StoredReservation } from "../../types/reservation";

/** 숙소 예약하기 API */
export const makeReservationAPI = async (body: MakeReservationAPIBody): Promise<StoredReservation> => {
    const { data } = await axios.post(`/api/reservation`, body);
    return data;
}
