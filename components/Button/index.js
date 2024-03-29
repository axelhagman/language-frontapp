import React, { useState } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  align-items: center;
  padding: 0.75rem 2rem;
  margin: 0;
  background-color: ${({ colorOverride, fullOpacity }) =>
    colorOverride
      ? getColor({ color: colorOverride, opacity: fullOpacity ? 0.36 : 0.72 })
      : getColor({
          color: 'primaryDark',
          opacity: 1,
        })};
  border-radius: 0.5rem;
  border: 0;
  cursor: pointer;
  transition: all ease 0.25s;
  &:hover {
    background-color: ${({ colorOverride, fullOpacity }) =>
      colorOverride
        ? getColor({ color: colorOverride, opacity: fullOpacity ? 0.52 : 1 })
        : getColor({
            color: 'primaryDark',
            opacity: 0.8,
          })};
  }
  > * {
    pointer-events: none;
  }
`;

const Button = ({
  id,
  type,
  as,
  href,
  children,
  onClick,
  fullWidth,
  colorOverride,
  fullOpacity,
}) => {
  return (
    <StyledButton
      id={id}
      type={type}
      onClick={onClick}
      as={as}
      href={href}
      fullWidth={fullWidth}
      colorOverride={colorOverride}
      fullOpacity={fullOpacity}
    >
      <p style={{ fontSize: 14, color: 'white', fontWeight: 'regular' }}>
        {children}
      </p>
    </StyledButton>
  );
};

export default Button;
