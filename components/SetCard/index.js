import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #dcddfc;
  height: 10rem;
  ${getShadow({ size: 'SOFT_L' })}
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const StatusBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 0.25rem;
  height: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
  background-color: white;
`;

const RememberBar = styled.div`
  position: absolute;
  width: ${({ rememberPercent }) =>
    rememberPercent ? `${rememberPercent}%` : '0%'};
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1rem;
  background-color: black;
`;

const StartedBar = styled.div`
  position: absolute;
  width: ${({ startedPercent }) =>
    startedPercent ? `${startedPercent}%` : '0%'};
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1rem;
  background-color: rgba(0, 0, 0, 0.42);
`;

const SetCard = ({ title, id, numGroups, numWords }) => {
  return (
    <Container>
      <Row>
        <h2>{title || ''}</h2>
        <Link href={`/edit/${id}`}>
          <a>
            <p>Edit</p>
          </a>
        </Link>
      </Row>
      <ProgressContainer>
        <p>Progress</p>
        <StatusBar>
          <StartedBar startedPercent={74} />
          <RememberBar rememberPercent={52} />
        </StatusBar>
      </ProgressContainer>
    </Container>
  );
};

export default SetCard;
