import { UserType } from "./user";

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
    conveniences: string[],
    popularConveniences: string[],
    safetyGoods: string[]
    photos: string[],
    title: string,
    description: string,
    price: number,
};

// 만들어진 숙소 타입
export type StoredRoomType = {
    id: number;
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    bathroomType: 'private' | 'public';
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    amentities: string[],
    conveniences: string[],
    photos: string[],
    description: string,
    title: string,
    price: number,
    startDate: Date;
    endDate: Date;
    createAt: Date;
    updateAt: Date;
    hostId: number;
}

// 숙소 타입
export type RoomType = {
    id: number;
    largeBuildingType: string | null;
    buildingType: string | null;
    roomType: string | null;
    maximumGuestCount: number;
    bedroomCount: number;
    bedCount: number;
    bathroomCount: number;
    bathroomType: 'private' | 'public';
    latitude: number;
    longitude: number;
    country: string;
    city: string;
    district: string;
    streetAddress: string;
    detailAddress: string;
    postcode: string;
    amentities: string[],
    conveniences: string[],
    photos: string[],
    description: string,
    title: string,
    price: string,
    startDate: string;
    endDate: string;
    createAt: string;
    updateAt: string;
    host: UserType;
};