import React from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border-radius: 1rem;
  transition: all ease 0.25s;
  width: 100%;
  background-color: ${({ active }) =>
    active ? getColor({ color: 'primary', opacity: 0.36 }) : 'transparent'};
  ${({ active }) =>
    active
      ? ''
      : `&:hover {
    background-color: ${getColor({ color: 'primary', opacity: 0.24 })};
  }`}
`;

const MenuOption = ({ title, onClick, active }) => {
  return (
    <Container onClick={onClick} active={active}>
      <h3>{title}</h3>
    </Container>
  );
};

export default MenuOption;
