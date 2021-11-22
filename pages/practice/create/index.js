import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import getColor from 'theme/getColor';

import Basics from './components/basicInfo';

const Container = styled.div`
  padding: 2rem;
`;

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

const NextButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: ${getColor({ color: 'primary' })};
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Divider = styled.div`
  min-width: 1rem;
`;

const Create = () => {
  const [view, setView] = useState('basics');

  const getContent = useCallback(() => {
    switch (view) {
      case 'basics':
        return <Basics />;
      case 'content':
        return (
          <>
            <InfoBlock>
              <Header>
                <h2>Content</h2>
              </Header>
              <InputBlock>
                <InputTitle>
                  <h3>Word</h3>
                </InputTitle>
                <input placeholder='Word' />
              </InputBlock>
              <InputBlock>
                <InputTitle>
                  <h3>Translation</h3>
                </InputTitle>
                <input placeholder='Translation' />
              </InputBlock>
              <InputBlock>
                <InputTitle>
                  <h3>Description</h3>
                </InputTitle>
                <input placeholder='Description' />
              </InputBlock>
            </InfoBlock>
            <NextStepContainer>
              <NextButton>
                <h2>Add</h2>
              </NextButton>
            </NextStepContainer>
            <ButtonContainer>
              <NextButton onClick={() => setView('basics')}>
                <h2>Back</h2>
              </NextButton>
              <Divider />
              <NextButton>
                <h2>Next</h2>
              </NextButton>
            </ButtonContainer>
          </>
        );
      default:
        return (
          <>
            <InfoBlock>
              <Header>
                <h2>Basic Info</h2>
              </Header>
              <InputBlock>
                <InputTitle>
                  <h3>Name</h3>
                </InputTitle>
                <input placeholder='Name' />
              </InputBlock>
              <InputBlock>
                <InputTitle>
                  <h3>Languages</h3>
                </InputTitle>
                <input placeholder='Language' />
                <input placeholder='Language' />
              </InputBlock>
              <InputBlock>
                <InputTitle>
                  <h3>Description (optional)</h3>
                </InputTitle>
                <input placeholder='Description' />
              </InputBlock>
            </InfoBlock>
            <NextStepContainer onClick={() => setView('content')}>
              <NextButton>
                <h2>Next</h2>
              </NextButton>
            </NextStepContainer>
          </>
        );
    }
  }, [view]);

  return (
    <Container>
      <h1>Create new</h1>
      {getContent()}
    </Container>
  );
};

export default Create;
