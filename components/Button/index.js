import React, { useState } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: fit-content;
  align-items: center;
  padding: 0.75rem 1.25rem;
  margin: 0;
  background-color: ${getColor({ color: 'primary', opacity: 0.36 })};
  border-radius: 1rem;
  border: 0;
  cursor: pointer;
  transition: all ease 0.25s;
  &:hover {
    background-color: ${getColor({ color: 'primary', opacity: 0.56 })};
  }
  > * {
    pointer-events: none;
  }
`;

const Button = ({ id, type, as, href, children, onClick }) => {
  return (
    <StyledButton id={id} type={type} onClick={onClick} as={as} href={href}>
      <p style={{ fontSize: 16, fontWeight: 'bold' }}>{children}</p>
    </StyledButton>
  );
};

export default Button;
