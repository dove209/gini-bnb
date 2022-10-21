import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import queryCache from '../../../queryCache';


const index = () => {
  return (
    <div>index</div>
  )
}

export default index