import React from 'react';
import styled from 'styled-components';

import { AuthProvider } from 'utils/auth';
import Menu from 'components/Menu';
import TopBar from 'components/TopBar';

const AppContainer = styled.div`
  display: flex;
  background-color: #f2f1f8;
  position: relative;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const ZIndexWrapper = styled.div`
  display: flex;
  width: 100%;
  z-index: 1;
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: #0e111e;
`;

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 1rem 0 0 1rem;
  background-color: white;
`;

//background: linear-gradient(0deg, #f2f1f8 0%, #ffffff 100%);
const Layout = ({ children }) => {
  return (
    <AuthProvider>
      <AppContainer>
        <ZIndexWrapper>
          <Menu />
          <ContentWrapper>
            <TopBar />
            <InnerContent>{children}</InnerContent>
          </ContentWrapper>
        </ZIndexWrapper>
        <BackgroundGradient />
      </AppContainer>
    </AuthProvider>
  );
};

export default Layout;
