import { NextPage } from "next";
import React from 'react';
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getAllRoomListAPI } from "../lib/api/room";
import queryCache from "../queryCache";

import Home from "../components/home/Home";

const index: NextPage = () => {
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryCache.allRooms, getAllRoomListAPI)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}


export default index;
