import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';

import { useAuthContext } from 'utils/auth';
import PracticeCard from 'components/PracticeCard';
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
  const { user } = useAuthContext();

  const onGet = async () => {
    await axios
      .get('/api/cards', { params: { userUid: user.uid } })
      .then((res) => setData(res.data));
  };

  return (
    <Container>
      <h1>Practice</h1>
      <Link href='/practice/create'>
        <a>
          <Button>Create New</Button>
        </a>
      </Link>
      <Button onClick={onGet}>Test Get</Button>
      <PracticeGrid>
        {MOCK_SETS.map((mockSetData) => (
          <SetCard
            key={`${mockSetData.title}`}
            title={mockSetData.title}
            numSets={mockSetData.numSets}
            numWords={mockSetData.numWords}
          />
        ))}
      </PracticeGrid>
      <PracticeList>
        {data &&
          data.length > 0 &&
          data.map((practiceData, index) => {
            return (
              <>
                <Link href={`/practice/${practiceData.id}`}>
                  <a>
                    <PracticeCard key={`${index}`} data={practiceData} />
                  </a>
                </Link>
                <Divider />
              </>
            );
          })}
      </PracticeList>
    </Container>
  );
};

export default PracticeLanding;
