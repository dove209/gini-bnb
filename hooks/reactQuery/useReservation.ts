import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { makeReservationAPI, getMyReservationListAPI, cancelReservationAPI } from '../../lib/api/reservation';
import queryCache from '../../queryCache';
import { StoredReservation } from '../../types/reservation';

/** [GET]: 나의 숙소 예약 현황 리스트 */
export const useGetMyReservation = (userId: string) => {
    return useQuery<StoredReservation[], AxiosError>(queryCache.myReservation(userId), () => getMyReservationListAPI(userId), {
        staleTime: 30 * 1000,
        enabled: !!userId,   
    })
}

/** [POST]: 숙소 예약 등록 */
export const usePostReservation = () => {
    return useMutation(makeReservationAPI)
}

/** [DELETE]: 숙소 예챡 취소 */
export const useCancelReservation = () => {
    return useMutation(cancelReservationAPI)
}