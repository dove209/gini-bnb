import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

import queryCache from '../../../queryCache';

import MyReservation from '../../../components/myReservation/MyReservation';

const index: NextPage = () => {
  return <MyReservation />
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
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      }
    }
  }
}



export default index;