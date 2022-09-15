import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import Custom404 from '../../404';
import LargeBuilding from '../../../components/room/register/LargeBuilding';
import Building from '../../../components/room/register/Building';
import Bedrooms from '../../../components/room/register/Bedrooms';


const RegisterStage: NextPage = () => {
    const router = useRouter();
    const stage = router.query.stage;

    if (stage === 'large-building') {
        return <LargeBuilding />
    } else if (stage === 'building') {
      return <Building />
    } else if (stage === 'bedrooms') {
        return <Bedrooms />
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