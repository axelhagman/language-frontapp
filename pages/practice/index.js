import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';

import { useAuthContext } from 'utils/auth';
import GroupCard from 'components/GroupCard';
import Button from 'components/Button';
import SetCard from 'components/SetCard';

const Container = styled.div``;

const PracticeList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Divider = styled.div`
  min-height: 1rem;
`;

const PracticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
`;

const MOCK_SETS = [
  { title: '1000 most common Greek words', numSets: 25, numWords: 1000 },
  { title: 'Spanish essentials', numSets: 10, numWords: 500 },
  { title: 'Greek foods', numSets: 5, numWords: 100 },
  { title: 'Academic English vocabulary', numSets: 10, numWords: 250 },
];

const PracticeLanding = () => {
  const [data, setData] = useState(null);
  const [activeDecksData, setActiveDecksData] = useState(null);
  const { user } = useAuthContext();

  const onGet = async () => {
    await axios
      .get('/api/cards', { params: { userUid: user.uid } })
      .then((res) => setData(res.data));
  };

  const onGetActive = async () => {
    await axios
      .get('/api/activeDecks', { params: { userUid: user.uid } })
      .then((res) => setActiveDecksData(res.data));
  };

  console.log(activeDecksData);

  return (
    <Container>
      <h1>Practice</h1>
      <Link href='/practice/create'>
        <a>
          <Button>Create New</Button>
        </a>
      </Link>
      <Button onClick={onGet}>Test Get</Button>
      <Button onClick={onGetActive}>Test Get Active Decks</Button>
      <PracticeGrid>
        {activeDecksData?.activeDecks &&
          Object.keys(activeDecksData.activeDecks).length > 0 &&
          Object.keys(activeDecksData.activeDecks).map((deckId, index) => {
            const { basicDeckData, userDeckData } =
              activeDecksData.activeDecks[deckId];
            console.log('Axel: ', basicDeckData, userDeckData);
            return (
              <Link href={`/practice/${deckId}`} key={`${deckId}`}>
                <a>
                  <SetCard
                    title={basicDeckData.title}
                    numSets={0}
                    numWords={basicDeckData?.words?.length}
                  />
                </a>
              </Link>
            );
          })}
      </PracticeGrid>
      <PracticeGrid>
        {data &&
          data.length > 0 &&
          data.map((practiceData, index) => {
            console.log(practiceData);
            return (
              <Link
                href={`/practice/${practiceData.id}`}
                key={`${practiceData.id}`}
              >
                <a>
                  <SetCard
                    title={practiceData.title}
                    numSets={0}
                    numWords={practiceData?.words?.length}
                  />
                </a>
              </Link>
            );
          })}
      </PracticeGrid>
    </Container>
  );
};

export default PracticeLanding;
