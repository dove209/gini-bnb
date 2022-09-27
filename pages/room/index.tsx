/* eslint-disable @next/next/no-typos */
import React from "react";
import { NextPage } from 'next';
import { GetServerSideProps } from "next";
import RoomMain from '../../components/room/main/RoomMain';
import { GetRoomListAPIQueries } from "../../types/room";

interface IProps {
    queries: GetRoomListAPIQueries
}

const index: NextPage<IProps> = ({ queries }) => {
    return <RoomMain queries={queries} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { location, checkInDate, checkOutDate, adultCount, childrenCount, infantsCount, latitude, longitude, limit, page = '1' } = query;
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
    };

    return {
        props: {
            queries
        }
    }
}


export default index;