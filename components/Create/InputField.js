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
  border: 2px solid rgba(145, 145, 145, 0.4);
  outline: none;
  font-size: 1.25rem;
  text-align: center;
  autocomplete: off;
  &:focus {
    border: 2px solid rgba(145, 145, 145, 1);
  }
`;

const InputField = ({
  onInput,
  customValue,
  name,
  placeholder,
  onKeyDown,
  inputFieldId,
}) => {
  return (
    <Container>
      <StyledInput
        onInput={onInput}
        value={customValue}
        name={name}
        id={inputFieldId || null}
        autoComplete='off'
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
};

export default InputField;
