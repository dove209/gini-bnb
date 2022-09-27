import { UserType } from "./user";

// 숙소 등록 단계
export type RegisterRoomState = {
    largeBuildingType: string;
    buildingType: string;
    roomType: string;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    bathroomType: 'private' | 'public';
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    latitude: number;
    longitude: number;
    conveniences: string[];
    popularConveniences: string[];
    safetyGoods: string[];
    photos: string[];
    title: string;
    description: string;
    price: number;
    hostId: string;
};

// 만들어진 숙소 타입
export type StoredRoomType = RegisterRoomState & {
    id: string;
    createAt: string;
    updateAt: string;
}

/** 숙소 리스트 불러오기 Query */
export type GetRoomListAPIQueries = {
    location?: string | string[];
    checkInDate?: string | string[];
    checkOutDate?: string | string[];
    adultCount?: string | string[];
    childrenCount?: string | string[];
    infantsCount?: string | string[];
    latitude?: string | string[];
    longitude?: string | string[];
    limit?: string | string[];
    page?: string | string[];
};