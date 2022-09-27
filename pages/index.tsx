import type { NextPage } from "next";
import React from 'react';
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

import Home from "../components/home/Home";


const index: NextPage = () => {
  return <Home />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res}) => {
  const secret  = process.env.JWT_SECRET
  const token = await getToken({ req, secret })
  // console.log(token)
  return { props: { } }
}


export default index;
