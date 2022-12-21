import React, { useEffect, useReducer, useState } from 'react';
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  min-height: 1rem;
  min-width: 1rem;
`;

const PracticeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const PracticeLanding = () => {
  const [allDecks, setAllDecks] = useState(null);
  const [activeDecksData, setActiveDecksData] = useState(null);
  const { user } = useAuthContext();

  const getAllDecks = async () => {
    await axios
      .get('/api/deck/activeDecks', { params: { userUid: user.uid } })
      .then((res) => {
        console.log(res.data);
        setActiveDecksData(res.data.activeDecks);
        const filteredDecksKeys = Object.keys(res.data.allDecks).filter(
          (deckId) => !Object.keys(res.data.activeDecks).includes(deckId)
        );

        const filteredDecks = {};

        filteredDecksKeys.forEach((key) => {
          filteredDecks[key] = res.data.allDecks[key];
        });

        setAllDecks(filteredDecks);
      });
  };

  useEffect(() => {
    if (user) {
      getAllDecks();
    }
  }, [user]);

  console.log(allDecks);

  return (
    <Container>
      <h1>Practice</h1>
      <Row>
        <Link href='/practice/create'>
          <a>
            <Button>Create New</Button>
          </a>
        </Link>
      </Row>
      <TitleBlock>
        <h2>Your Active Decks</h2>
      </TitleBlock>
      <PracticeGrid>
        {activeDecksData &&
          Object.keys(activeDecksData).length > 0 &&
          Object.keys(activeDecksData).map((deckId) => {
            const { basicDeckData, userDeckData } = activeDecksData[deckId];
            console.log('Axel: ', basicDeckData, userDeckData);
            return (
              <Link href={`/practice/${deckId}`} key={`${deckId}`}>
                <a>
                  <SetCard
                    title={basicDeckData.title}
                    id={deckId}
                    numSets={0}
                    numWords={basicDeckData?.words?.length}
                  />
                </a>
              </Link>
            );
          })}
      </PracticeGrid>
      <TitleBlock>
        <h2>Browse Decks</h2>
      </TitleBlock>
      <PracticeGrid>
        {allDecks &&
          Object.keys(allDecks).length > 0 &&
          Object.keys(allDecks).map((deckId) => {
            return (
              <Link href={`/practice/${deckId}`} key={`${deckId}`}>
                <a>
                  <SetCard
                    title={allDecks[deckId].title}
                    id={deckId}
                    numSets={0}
                    numWords={allDecks[deckId].words?.length}
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
