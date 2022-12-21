import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthContext } from 'utils/auth';
import AddBlock from 'components/Edit/AddBlock';
import getShadow from 'theme/getShadow';
import useDeck from 'utils/hooks/useDeck';

const Container = styled.div``;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem 1rem 0 0;
  background-color: #dcddfc;
  padding: 1.5rem;
  padding-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 1rem;
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')}
  ${getShadow('MD')}
`;

const AddBlockPage = () => {
  // const [data, setData] = useState(null);
  const { user } = useAuthContext();
  const router = useRouter();

  const id = router.query.slug;

  const { data, error, isLoading } = useDeck(id);

  console.log(id);

  // const getData = async () => {
  //   await axios
  //     .get(`/api/deck/${id}`, { params: { userUid: user.uid } })
  //     .then((res) => {
  //       setData(res.data);
  //     });
  // };

  // useEffect(() => {
  //   if (user) {
  //     getData();
  //   }
  // }, [user]);

  return (
    <Container>
      <TopContainer>
        <h1>Edit set</h1>
        <h2>{data?.title}</h2>
        {/* <h3>
          Practice set: {wordsStatus && Object.keys(wordsStatus).length} words
        </h3> */}
      </TopContainer>
      {data && (
        <CardContainer>
          <AddBlock
            setId={id}
            // onClose={() => setAddActive(false)}
            practiceSetData={data}
          />
        </CardContainer>
      )}
    </Container>
  );
};

export default AddBlockPage;
