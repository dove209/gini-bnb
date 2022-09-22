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
