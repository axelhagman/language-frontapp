import React from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')}
  ${getShadow('MD')}
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const GroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
  width: 100%;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #f2f2f2;
`;

const MOCK_WORD_GROUPS = [
  {
    title: 'Appliances',
    words: [
      {
        word: 'air conditioner',
        translation: 'luftkonditionering',
      },
      {
        word: 'radiator',
        translation: 'element',
      },
      {
        word: 'thermostat',
        translation: 'termometer',
      },
      {
        word: 'lamp',
        translation: 'lampa',
      },
      {
        word: 'television',
        translation: 'tv',
      },
      {
        word: 'sewing machine',
        translation: 'symaskin',
      },
      {
        word: 'vacuum cleaner',
        translation: 'dammsugare',
      },
      {
        word: 'iron',
        translation: 'strykjärn',
      },
      {
        word: 'dish washer',
        translation: 'diskmaskin',
      },
      {
        word: 'stove',
        translation: 'stekplatta',
      },
    ],
  },
  {
    title: 'Weather',
    words: [
      {
        word: 'air conditioner',
        translation: 'luftkonditionering',
      },
      {
        word: 'radiator',
        translation: 'element',
      },
      {
        word: 'thermostat',
        translation: 'termometer',
      },
      {
        word: 'lamp',
        translation: 'lampa',
      },
      {
        word: 'television',
        translation: 'tv',
      },
      {
        word: 'sewing machine',
        translation: 'symaskin',
      },
      {
        word: 'vacuum cleaner',
        translation: 'dammsugare',
      },
      {
        word: 'iron',
        translation: 'strykjärn',
      },
      {
        word: 'dish washer',
        translation: 'diskmaskin',
      },
      {
        word: 'stove',
        translation: 'stekplatta',
      },
    ],
  },
];

const StartView = ({ words, blocks }) => {
  if (!blocks) {
    return null;
  }

  return (
    <Container>
      <CardContainer>
        <h2>Blocks info</h2>
        <p>{blocks.length} blocks</p>
        <Divider />
        <GroupsGrid>
          {blocks.map((block) => {
            return (
              <GroupContainer key={`${block.blockTitle}`}>
                <h3>{block.blockTitle}</h3>
                <p>{block.words.length} words</p>
              </GroupContainer>
            );
          })}
        </GroupsGrid>
      </CardContainer>
    </Container>
  );
};

export default StartView;
