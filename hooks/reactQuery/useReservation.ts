import { useMutation } from '@tanstack/react-query';
import { makeReservationAPI } from '../../lib/api/reservation';


/** [POST]: 숙소 예약 등록 */
export const usePostReservation = () => {
    return useMutation(makeReservationAPI)
}
