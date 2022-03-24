import React from 'react';
import styled from 'styled-components';

import { useAuthContext } from 'context/auth';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

const SearchBar = styled.div`
  width: 20rem;
  height: 2.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.div`
  min-width: 1rem;
`;

const Notifications = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  ${getShadow({ size: 'SM' })}
`;

const Profile = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.12);
  ${getShadow({ size: 'SM' })}
`;

const TopBar = () => {
  const { user } = useAuthContext();
  return (
    <Container>
      <SearchBar />
      <RightBlock>
        <Notifications />
        <Divider />
        {user && <h1>{user.displayName}</h1>}
        {/* <Profile /> */}
      </RightBlock>
    </Container>
  );
};

export default TopBar;
