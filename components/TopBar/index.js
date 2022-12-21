import React from 'react';
import styled from 'styled-components';

import { useAuthContext } from 'utils/auth';
import getShadow from 'theme/getShadow';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const SearchBar = styled.div`
  width: 20rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 1);
`;

const RightBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
`;

const Divider = styled.div`
  min-width: 1rem;
`;

const Notifications = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 1);
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
        {user && <h3 style={{ color: 'white' }}>{user.displayName}</h3>}
        <Divider />
        <Notifications />
        {/* <Profile /> */}
      </RightBlock>
    </Container>
  );
};

export default TopBar;
