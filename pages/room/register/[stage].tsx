import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import Custom404 from '../../404';
import RegisterRoomBuilding from '../../../components/room/register/RegisterRoomBuilding';
import RegisterRoomBedrooms from '../../../components/room/register/RegisterRoomBedrooms';


const RegisterStage: NextPage = () => {
    const router = useRouter();
    const stage = router.query.stage;

    if (stage === 'building') {
        return <RegisterRoomBuilding />
    } else if (stage === 'bedrooms') {
        return <RegisterRoomBedrooms />
    }
    return <Custom404 />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res}) => {
    const session = await getSession({req});
    if(!session) {
      return {
        redirect: {
          permanent: true,
          destination: "/",
        },
      };
    } 
    return { props: { } }
  }


export default RegisterStage;