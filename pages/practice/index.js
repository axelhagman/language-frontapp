import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div``;

const PracticeLanding = () => {
  return (
    <Container>
      <h1>Practice</h1>
      <Link href='/practice/create'>
        <a>
          <h3>Create New</h3>
        </a>
      </Link>
    </Container>
  );
};

export default PracticeLanding;
