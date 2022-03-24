import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  height: 12.5rem;
  ${getShadow({ size: 'SOFT_L' })}
  cursor: pointer;
`;

const StatusBar = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: auto;
  height: 0.5rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const RememberBar = styled.div`
  position: absolute;
  width: ${({ rememberPercent }) =>
    rememberPercent ? `${rememberPercent}%` : '0%'};
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1rem;
  background-color: green;
`;

const StartedBar = styled.div`
  position: absolute;
  width: ${({ startedPercent }) =>
    startedPercent ? `${startedPercent}%` : '0%'};
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 1rem;
  background-color: orange;
`;

const SetCard = ({ title, numGroups, numWords }) => {
  return (
    <Container>
      <h2>{title || ''}</h2>
      <h3>{numGroups || ''} word groups</h3>
      <h3>{numWords || ''} words in total</h3>
      <StatusBar>
        <StartedBar startedPercent={74} />
        <RememberBar rememberPercent={52} />
      </StatusBar>
    </Container>
  );
};

export default SetCard;
