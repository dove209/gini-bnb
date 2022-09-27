/* eslint-disable @next/next/no-typos */
import React from "react";
import { NextPage } from 'next';
import { GetServerSideProps } from "next";
import RoomMain from '../../components/room/main/RoomMain';
import { GetRoomListAPIQueries } from "../../types/room";
import { getRoomListAPI } from "../../lib/api/room";
import queryCache from "../../queryCache";

import { dehydrate, QueryClient } from '@tanstack/react-query';

const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: any, value: any) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};

interface IProps {
    queries: GetRoomListAPIQueries
}

const index: NextPage<IProps> = ({ queries }) => {
    return <RoomMain queries={queries} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const queryClient = new QueryClient();

    const { location, checkInDate, checkOutDate, adultCount = 0, childrenCount = 0, infantsCount = 0, latitude, longitude, limit, page = '1' } = query;
    const queries = {
        location: location ? encodeURI(location as string) : undefined,
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        infantsCount,
        latitude,
        longitude,
        limit: limit || '20',
        page: page || '1'
    } as GetRoomListAPIQueries;


    await queryClient.prefetchQuery(queryCache.rooms(queries), () => getRoomListAPI(queries));

    return {
        props: {
            queries,
            dehydratedState: JSON.stringify(dehydrate(queryClient), getCircularReplacer()),
        }
    }
}


export default index;