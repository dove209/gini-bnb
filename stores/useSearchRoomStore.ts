import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface ISearchRoomStore {
    location: string;
    latitude: number;
    longitude: number;
    checkInDate: string | null;
    checkOutDate: string | null;
    adultCount: number;
    childrenCount: number;
    infantsCount: number;
    setLocation: (payload: string) => void;
    setLatitude: (payload: number) => void;
    setLongitude: (payload: number) => void;
    setCheckInDate: (payload: string | null) => void;
    setCheckOutDate: (payload: string | null) => void;
    setAdultCount: (payload: number) => void;
    setChildrenCount: (payload: number) => void;
    setInfantsCount: (payload: number) => void;
};

const useSearchRoomStore = create<ISearchRoomStore>()(
    devtools(
        (set) => ({
            location: '',
            latitude: 0,
            longitude: 0,
            checkInDate: null,
            checkOutDate: null,
            adultCount: 0,
            childrenCount: 0,
            infantsCount: 0,
            setLocation: (payload) => set(() => ({ location: payload })),
            setLatitude: (payload) => set(() => ({ latitude: payload })),
            setLongitude: (payload) => set(() => ({ longitude: payload })),
            setCheckInDate: (payload) => set(() => ({ checkInDate: payload })),
            setCheckOutDate: (payload) => set(() => ({ checkOutDate: payload })),
            setAdultCount: (payload) => set(() => ({ adultCount: payload })),
            setChildrenCount: (payload) => set(() => ({ childrenCount: payload })),
            setInfantsCount: (payload) => set(() => ({ infantsCount: payload })),
        })
    )
);

export { useSearchRoomStore };
