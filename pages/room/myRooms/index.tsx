import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { getMyRoomsListAPI } from '../../../lib/api/room';

import queryCache from '../../../queryCache';

import MyRooms from '../../../components/myRooms/MyRooms';

const index: NextPage = ({ userId }: { userId?: string }) => {
  return <MyRooms userId={userId} />
}

export default index;

export const getServerSideProps: GetServerSideProps = async ({ req, res}) => {
  const queryClient = new QueryClient();
  const session = await getSession({ req });
  if(!session) {
    return {
      props: {},
      redirect: {
        permanent: true,
        destination: '/'
      }
    };
  } else {
    const userId = session?.user?.id;
    await queryClient.prefetchQuery(queryCache.myRooms(userId), () => getMyRoomsListAPI(userId))
    return {
      props: {
        userId: userId,
        dehydratedState: dehydrate(queryClient)
      }
    }
  }
}