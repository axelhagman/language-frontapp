import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const NeedsReview = () => {
  return (
    <Container>
      <List></List>
    </Container>
  );
};

export default NeedsReview;
