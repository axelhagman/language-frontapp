import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';

import { useAuthContext } from 'context/auth';
import PracticeCard from 'components/PracticeCard';
import Button from 'components/Button';

const Container = styled.div``;

const PracticeList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Divider = styled.div`
  min-height: 1rem;
`;

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
