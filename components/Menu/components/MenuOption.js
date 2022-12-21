import React from 'react';
import styled from 'styled-components';
import IconHome from 'public/icons/iconHome';
import IconCalendar from 'public/icons/iconCalendar';
import IconLearn from 'public/icons/iconLearn';
import IconSettings from 'public/icons/iconSettings';
import IconList from 'public/icons/iconList';

import getColor from 'theme/getColor';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: all ease 0.25s;
  margin-bottom: 0.5rem;
  width: 100%;
  background-color: ${({ active }) =>
    active ? getColor({ color: 'white', opacity: 1 }) : 'transparent'};
  ${({ active }) =>
    active
      ? ''
      : `&:hover {
    background-color: ${getColor({ color: 'white', opacity: 0.24 })};
  }`}
  * {
    transition: all ease 0.25s;
  }
`;

const StyledH3 = styled.h3`
  color: ${({ active }) => (active ? 'black' : 'white')};
  transition: all ease 0.25s;
  ${({ hasIcon }) => (hasIcon ? 'margin-left: 1rem;' : '')}
`;

const getMenuIcon = (title, active) => {
  switch (title) {
    case 'Overview':
      return <IconHome color={active ? 'black' : 'white'} />;
    case 'Practice':
      return <IconList color={active ? 'black' : 'white'} />;
    case 'Schedule':
      return <IconCalendar color={active ? 'black' : 'white'} />;
    case 'Courses':
      return <IconLearn color={active ? 'black' : 'white'} />;
    case 'Settings':
      return <IconSettings color={active ? 'black' : 'white'} />;
    default:
      return null;
  }
};

const MenuOption = ({ title, hasIcon = true, onClick, active }) => {
  return (
    <Container onClick={onClick} active={active}>
      {getMenuIcon(title, active)}
      <StyledH3 hasIcon={hasIcon} active={active}>
        {title}
      </StyledH3>
    </Container>
  );
};

export default MenuOption;
