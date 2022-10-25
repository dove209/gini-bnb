// 숙요 예약 요청 Body 타입
export type MakeReservationAPIBody = {
    userId: string;
    roomId: string;
    title: string;
    checkInDate: string;
    checkOutDate: string;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
};


// 숙소 예약 타입
export type StoredReservation = MakeReservationAPIBody & {
    id: string;
    createdAt: string;
    updatedAt: string;
};