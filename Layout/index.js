import React from 'react';
import styled from 'styled-components';

import Menu from 'components/Menu';
import TopBar from 'components/TopBar';

const AppContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  background-color: white;
  height: 200vh;
`;

const Layout = ({ children }) => {
  return (
    <AppContainer>
      <Menu />
      <ContentWrapper>
        <TopBar />
        {children}
      </ContentWrapper>
    </AppContainer>
  );
};

export default Layout;
