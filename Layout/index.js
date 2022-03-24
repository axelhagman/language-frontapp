import React from 'react';
import styled from 'styled-components';

import { AuthProvider } from 'context/auth';
import Menu from 'components/Menu';
import TopBar from 'components/TopBar';

const AppContainer = styled.div`
  display: flex;
  background-color: #f2f1f8;
`;

const ContentWrapper = styled.div`
  width: 100%;
  background-color: #f2f1f8;
  height: 200vh;
  padding: 2rem;
`;

const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <AppContainer>
        <Menu />
        <ContentWrapper>
          <TopBar />
          {children}
        </ContentWrapper>
      </AppContainer>
    </AuthProvider>
  );
};

export default Layout;
