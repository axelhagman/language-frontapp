import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import getColor from 'theme/getColor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: ${getColor({ color: 'primary', opacity: 0.36 })};
`;

const PracticeCard = ({ data }) => {
  console.log(data);
  return (
    <Container>
      <h2>{data.title}</h2>
      <h3>{data.displayName}</h3>
      <p>{data.language01}</p>
      <p>{data.language02}</p>
      <p>Number of words: {data.words.length}</p>
    </Container>
  );
};

export default PracticeCard;
