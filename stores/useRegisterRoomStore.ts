import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { RegisterRoomState } from '../types/room';

type largeBuildingType = RegisterRoomState['largeBuildingType'];
type buildingType = RegisterRoomState['buildingType'];
type roomType = RegisterRoomState['roomType'];
type floorPlanType = Pick<RegisterRoomState, 'maximumGuestCount' | 'bedroomCount' | 'bedCount' | 'bathroomCount' | 'bathroomType'>;
type addressType = Pick<RegisterRoomState, 'country' | 'city' | 'district' | 'streetAddress' | 'detailAddress' | 'postcode' | 'latitude' | 'longitude'>;
type addrType = Pick<RegisterRoomState, 'conveniences' | 'popularConveniences' | 'safetyGoods'>;
type PhotosType = RegisterRoomState['photos'];
type titleType = RegisterRoomState['title'];
type descriptionType = RegisterRoomState['description'];
type priceType = RegisterRoomState['price'];
type HostIdType = RegisterRoomState['hostId'];


interface IRegisterRoomStore extends RegisterRoomState {
    setLargeBuildingType: (payload: largeBuildingType) => void;
    setBuildingType: (payload: buildingType) => void;
    setRoomType: (payload: roomType) => void;
    setFloorPlan: (payload: floorPlanType) => void;
    setAddress: (payload: addressType) => void;
    setAmenities: (payload: addrType) => void;
    setPhotos: (payload: PhotosType) => void;
    setTitle: (payload: titleType) => void;
    setDescription: (payload: descriptionType) => void;
    setPrice: (payload: priceType) => void;
    setHostId: (payload: HostIdType) => void;
    resetAll: () => void;
}

const initialState: RegisterRoomState = {
    largeBuildingType: '',
    buildingType: '',
    roomType: '',
    maximumGuestCount: 1,
    bedroomCount: 1,
    bedCount: 0,
    bathroomCount: 0.5,
    bathroomType: 'private',
    country: '',
    city: '',
    district: '',
    streetAddress: '',
    detailAddress: '',
    postcode: '',
    latitude: 0,
    longitude: 0,
    conveniences: [],
    popularConveniences: [],
    safetyGoods: [],
    photos: [],
    title: '',
    description: '',
    price: 0,
    hostId: '',
}

const useRegisterRoomStore = create<IRegisterRoomStore>()(
    devtools(
        // 새로고침 해도 유지된다.
        persist((set) => ({
            ...initialState,
            setLargeBuildingType: (payload) => set(() => ({ largeBuildingType: payload })),
            setBuildingType: (payload) => set(() => ({ buildingType: payload })),
            setRoomType: (payload) => set(() => ({ roomType: payload })),
            setFloorPlan: ({ maximumGuestCount, bedroomCount, bedCount, bathroomCount, bathroomType }) => set(() => ({ 
                maximumGuestCount,
                bedroomCount,
                bedCount,
                bathroomCount,
                bathroomType
             })),
             setAddress: ({ country, city, district, streetAddress, detailAddress, postcode, latitude, longitude }) => set(() => ({ 
                country,
                city,
                district,
                streetAddress,
                detailAddress,
                postcode,
                latitude,
                longitude
             })),
             setAmenities: ({ conveniences, popularConveniences, safetyGoods }) => set(() => ({
                conveniences,
                popularConveniences,
                safetyGoods
             })),
             setPhotos: (payload) => set(() => ({ photos: payload })),
             setTitle: (payload) => set(() => ({ title: payload })),
             setDescription: (payload) => set(() => ({ description: payload })),
             setPrice: (payload) => set(() => ({ price: payload })),
             setHostId: (payload) => set(() => ({ hostId: payload })),
             resetAll: () => set(initialState),
        }),
        {
            name: 'register-room',
        }
        )
    )
)

export { useRegisterRoomStore };
