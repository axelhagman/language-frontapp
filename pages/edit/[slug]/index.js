import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthContext } from 'utils/auth';
import GroupCard from 'components/GroupCard';
import Button from 'components/Button';
import SetCard from 'components/SetCard';
import IconEdit from 'public/icons/iconEdit';
import IconAdd from 'public/icons/iconAdd';
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
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 0.75rem;
  background-color: #f2f2f2;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IconContainer = styled.div`
  display: flex;
  padding: 1rem;
  height: fit-content;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.12);
`;

const EditSet = () => {
  //   const [data, setData] = useState(null);
  const { user } = useAuthContext();
  const router = useRouter();

  const id = router.query.slug;

  const { data, error, isLoading } = useDeck(id);

  console.log(data);

  console.log(id);

  //   const getData = async () => {
  //     await axios
  //       .get(`/api/deck/${id}`, { params: { userUid: user.uid } })
  //       .then((res) => {
  //         setData(res.data);
  //       });
  //   };

  //   useEffect(() => {
  //     if (user) {
  //       getData();
  //     }
  //   }, [user]);

  return (
    <>
      <Container>
        <TopContainer>
          <h1>Edit set</h1>
          <h2>{data?.title}</h2>
          {/* <h3>
          Practice set: {wordsStatus && Object.keys(wordsStatus).length} words
        </h3> */}
        </TopContainer>
        <CardContainer>
          <h2>Blocks info</h2>
          <p>{data?.blocks?.length} blocks</p>
          <Divider />
          <GroupsGrid>
            {data?.blocks.map((block) => {
              return (
                <GroupContainer key={`${block.title}`}>
                  <Column>
                    <h3>{block.title}</h3>
                    <p>{block.words.length} words</p>
                  </Column>
                  <IconContainer>
                    <IconEdit />
                  </IconContainer>
                </GroupContainer>
              );
            })}
            <GroupContainer>
              <h3>Add Block</h3>
              <Link href={`/edit/${id}/add-block`}>
                <a>
                  <IconContainer>
                    <IconAdd />
                  </IconContainer>
                </a>
              </Link>
            </GroupContainer>
          </GroupsGrid>
        </CardContainer>
      </Container>
    </>
  );
};

export default EditSet;
