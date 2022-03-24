import React, { useState } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';
import Button from 'components/Button';

import InputField from './InputField';

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const InputTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const NextStepContainer = styled.div`
  margin-top: 1rem;
`;

const Divider = styled.div`
  min-height: 0.5rem;
`;

const Basics = ({ onNext, initialData }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (evt) => {
    setData({ ...data, [evt.target.name]: evt.target.value });
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <InfoBlock>
        <Header>
          <h2>Basic Info</h2>
        </Header>
        <InputBlock>
          <InputTitle>
            <h3>Title</h3>
          </InputTitle>
          <InputField
            placeholder='Title'
            name='title'
            onInput={handleChange}
            customValue={data.title}
          />
        </InputBlock>
        <InputBlock>
          <InputTitle>
            <h3>Languages</h3>
          </InputTitle>
          <InputField
            placeholder='Language'
            name='language01'
            onInput={handleChange}
            customValue={data.language01}
          />
          <Divider />
          <InputField
            placeholder='Language'
            name='language02'
            onInput={handleChange}
            customValue={data.language02}
          />
        </InputBlock>
        <InputBlock>
          <InputTitle>
            <h3>Description (optional)</h3>
          </InputTitle>
          <InputField
            placeholder='Description'
            name='description'
            onInput={handleChange}
            customValue={data.description}
          />
        </InputBlock>
      </InfoBlock>
      <NextStepContainer onClick={() => onNext(data)}>
        <Button fullWidth>Next</Button>
      </NextStepContainer>
    </>
  );
};

export default Basics;
