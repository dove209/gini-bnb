import axios from ".";
import { MakeReservationAPIBody, StoredReservation } from "../../types/reservation";

/** 숙소 예약하기 API */
export const makeReservationAPI = (body: MakeReservationAPIBody): Promise<StoredReservation> => {
    return axios.post(`/api/reservation`, body);
}
