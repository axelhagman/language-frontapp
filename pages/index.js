import Button from 'components/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SM2 from 'utils/SM-2';

const AppContainer = styled.div`
  display: flex;
`;

const Overview = () => {
  const [dataState, setDataState] = useState({
    grade: 3,
    repetitionNumber: 2,
    easiness: 2.5,
    interval: 1.3,
  });

  return (
    <AppContainer>
      <h1>Overview</h1>
    </AppContainer>
  );
};

export default Overview;
