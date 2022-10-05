import { NextPage } from "next";
import React from 'react';
import { getToken } from "next-auth/jwt";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { getAllRoomListAPI } from "../lib/api/room";
import queryCache from "../queryCache";
import { getCircularReplacer } from "../lib/utils";

import Home from "../components/home/Home";

const index: NextPage = () => {
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const queryClient = new QueryClient();
  const secret = process.env.JWT_SECRET
  const token = await getToken({ req, secret })

  await queryClient.prefetchQuery(queryCache.allRooms, () => getAllRoomListAPI())

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient), getCircularReplacer())),
    }
  }
}


export default index;
