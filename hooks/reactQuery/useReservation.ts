import { AxiosError } from 'axios';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { makeReservationAPI } from '../../lib/api/reservation';
import { StoredReservation } from '../../types/reservation';


/** [POST]: 숙소 예약 등록 */
export const usePostReservation = () => {
    return useMutation(makeReservationAPI)
}
