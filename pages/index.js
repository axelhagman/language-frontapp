import Button from 'components/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useAuthContext } from 'utils/auth';

import NeedsReview from 'components/Overview/NeedsReview';

const AppContainer = styled.div`
  display: flex;
`;

const Overview = () => {
  const { user, userData } = useAuthContext();

  console.log(user, userData);

  // const getUserWords = async () => {
  //   await axios.get(`api/words/${user.uid}`).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  // useEffect(() => {
  //   if (user?.uid) {
  //     getUserWords();
  //   }
  // }, [user]);

  return (
    <AppContainer>
      <h1>Overview</h1>
      <NeedsReview userData={userData} />
    </AppContainer>
  );
};

export default Overview;
