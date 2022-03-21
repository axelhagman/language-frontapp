import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  doc,
  addDoc,
  collection,
  setDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import axios from 'axios';
import { useAuth } from 'context/auth';

import { firestore } from 'utils/firebase/clientApp';

const Container = styled.div``;

const PracticeList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PracticeCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  border-radius: 0.25rem;
  background-color: gray;
`;

const PracticeLanding = () => {
  const [data, setData] = useState(null);
  const [practiceDetails, setPracticeDetails] = useState(null);
  const { user } = useAuth();

  const onSubmit = async () => {
    // const title = 'testTitle 6';
    // const body = 'test body 8421';
    // await axios.post('/api/cards', { title, body, authorUid: user.uid });
  };

  const onGet = async () => {
    await axios
      .get('/api/cards', { params: { userUid: user.uid } })
      .then((res) => setData(res.data));
  };

  const onGetWords = async (docId) => {
    await axios
      .get(`/api/cards/${docId}`)
      .then((res) => setPracticeDetails(res.data));
  };

  console.log(practiceDetails);

  return (
    <Container>
      <h1>Practice</h1>
      <Link href='/practice/create'>
        <a>
          <h3>Create New</h3>
        </a>
      </Link>
      <StyledButton onClick={onSubmit}>
        <h2>Test post</h2>
      </StyledButton>
      <StyledButton onClick={onGet}>
        <h2>Test get</h2>
      </StyledButton>
      <PracticeList>
        {data &&
          data.length > 0 &&
          data.map((practiceData, index) => {
            return (
              <PracticeCard
                key={`${index}`}
                onClick={() => onGetWords(practiceData.id)}
              >
                <h3>{practiceData.title}</h3>
              </PracticeCard>
            );
          })}
      </PracticeList>
    </Container>
  );
};

export default PracticeLanding;
