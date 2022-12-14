import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getRoomAPI } from '../../lib/api/room';
import queryCache from "../../queryCache";

import RoomDetail from '../../components/room/detail/RoomDetail';

interface IProps {
    roomId: string
}

const roomDetail: NextPage<IProps> = ({ roomId }) => {
  return ( 
    <RoomDetail roomId={roomId} />
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const queryClient = new QueryClient();

    const { id } = query;

    await queryClient.prefetchQuery(queryCache.room(id as string), () => getRoomAPI(id as string));

    return {
        props: {
            roomId: id,
            dehydratedState: dehydrate(queryClient),
        }
    }
}

export default roomDetail;