import React, { useState } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';
import Button from 'components/Button';
import getShadow from 'theme/getShadow';

import InputField from './InputField';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')}
  ${getShadow('MD')}
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
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
      <CardContainer>
        <Header>
          <h1>Create New</h1>
          <h2>Basic Info</h2>
        </Header>
      </CardContainer>
      <CardContainer>
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
            <h3>Block Title</h3>
          </InputTitle>
          <InputField
            placeholder='Block Title'
            name='blockTitle'
            onInput={handleChange}
            customValue={data.blockTitle}
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
        <NextStepContainer onClick={() => onNext(data)}>
          <Button fullWidth colorOverride='notificationSuccess'>
            Next
          </Button>
        </NextStepContainer>
      </CardContainer>
    </>
  );
};

export default Basics;
