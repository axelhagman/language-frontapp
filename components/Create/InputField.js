import React from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  border: 2px solid gray;
  outline: none;
  font-size: 1rem;
  &:focus {
    border: 2px solid ${getColor({ color: 'primary' })};
  }
`;

const InputField = ({ onInput, customValue, name, placeholder }) => {
  return (
    <Container>
      <StyledInput
        onInput={onInput}
        value={customValue}
        name={name}
        autoComplete='off'
        placeholder={placeholder}
      />
    </Container>
  );
};

export default InputField;
