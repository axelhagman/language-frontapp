import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: white;
  ${getShadow('SOFT_L')}
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: white;
  ${getShadow('SOFT_L')}
`;

const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
  width: 100%;
`;

const WordSetOverview = () => {
  return (
    <Container>
      <TopContainer>
        <h2>1000 most common Greek words</h2>
      </TopContainer>
      <InfoContainer>
        <InfoTop>
          <h2>Word groups</h2>
          <h3>25 word groups</h3>
        </InfoTop>
        <GroupsGrid></GroupsGrid>
      </InfoContainer>
    </Container>
  );
};

export default WordSetOverview;
