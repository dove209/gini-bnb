import type { NextPage } from "next";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

const Home: NextPage = () => {
  const [test, setTest] = useState('test');
  const { data: session } = useSession();
  // console.log(session)

  return <div>hello next 안녕 코딩{test}</div>;
};

export default Home;
