import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useAuth } from 'context/auth';
import { useRouter } from 'next/router';

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
  position: relative;
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

const IndicatorContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 0.125rem;
  left: 0;
`;

const OptionIndicator = styled.div`
  width: 0.25rem;
  height: 2.5rem;
  left: 0;
  position: absolute;
  background-color: ${getColor({ color: 'primary' })};
  transition: all ease 0.25s;
  top: ${({ activeMenuIndex }) =>
    activeMenuIndex
      ? `calc((100% / 6) * ${activeMenuIndex * 2 + 1} - 1.25rem)`
      : 'calc(100% / 6 - 1.25rem)'};
`;

const Divider = styled.div`
  min-height: 1rem;
`;

const Menu = () => {
  const { user, login, logout } = useAuth();
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname.startsWith('/practice')) {
      setActiveMenuIndex(1);
    } else {
      setActiveMenuIndex(0);
    }
  }, [router.pathname]);

  return (
    <Container>
      <HeaderBlock>
        <h1>Lingu</h1>
      </HeaderBlock>
      <MainOptions>
        <Link href='/'>
          <a style={{ width: '100%' }}>
            <MenuOption title='Overview' active={activeMenuIndex === 0} />
          </a>
        </Link>

        <Link href='/practice'>
          <a style={{ width: '100%' }}>
            <MenuOption title='Practice' active={activeMenuIndex === 1} />
          </a>
        </Link>
        <MenuOption title='Schedule' />
        <MenuOption title='Courses' />
        <MenuOption title='Settings' />
        {/* <IndicatorContainer>
          <OptionIndicator activeMenuIndex={activeMenuIndex} />
        </IndicatorContainer> */}
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
