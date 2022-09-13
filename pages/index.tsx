import type { NextPage } from "next";
import React, { useState } from 'react';
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

const Home: NextPage = () => {
  return <div>hello next 안녕 코딩</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res}) => {
  const secret  = process.env.JWT_SECRET
  const token = await getToken({ req, secret })
  console.log(token)
  return { props: { } }
}


export default Home;
