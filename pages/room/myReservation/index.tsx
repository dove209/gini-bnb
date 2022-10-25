import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { getMyReservationListAPI } from '../../../lib/api/reservation';

import queryCache from '../../../queryCache';

import MyReservation from '../../../components/myReservation/MyReservation';

const index: NextPage = ({ userId }: { userId?: string }) => {
  return <MyReservation userId={userId} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
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
    const userId = session?.user?.id
    await queryClient.prefetchQuery(queryCache.myReservation(userId), () => getMyReservationListAPI(userId))
    return {
      props: {
        userId: userId,
        dehydratedState: dehydrate(queryClient),
      }
    }
  }
}



export default index;