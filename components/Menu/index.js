import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from 'context/auth';

import getColor from 'theme/getColor';
import getShadow from 'theme/getShadow';

import MenuOption from './components/MenuOption';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 2rem;
  min-width: 15rem;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MainOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BottomContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BottomCard = styled.div`
  width: 100%;
  height: 20rem;
  border-radius: 1.5rem;
  border: 1px solid ${getColor({ color: 'primary' })};
  background-color: ${getColor({ color: 'primary', opacity: 0.24 })};
  ${getShadow({ size: 'MD' })}
`;

const Divider = styled.div`
  min-height: 1rem;
`;

const Menu = () => {
  const { user, login, logout } = useAuth();
  return (
    <Container>
      <HeaderBlock>
        <h1>Lingu</h1>
      </HeaderBlock>
      <MainOptions>
        <MenuOption title='Overview' />
        <Link href='/practice'>
          <a style={{ width: '100%' }}>
            <MenuOption title='Practice' />
          </a>
        </Link>
        {/* <MenuOption title='Schedule' />
        <MenuOption title='Exams' /> */}
        <MenuOption title='Settings' />
      </MainOptions>
      <BottomContent>
        {user ? (
          <MenuOption onClick={logout} title='Log out' />
        ) : (
          <MenuOption onClick={login} title='Log In' />
        )}
        <Divider />
        {/* <BottomCard /> */}
      </BottomContent>
    </Container>
  );
};

export default Menu;
