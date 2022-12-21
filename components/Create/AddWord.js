import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';
import Button from 'components/Button';
import getShadow from 'theme/getShadow';

import InputField from './InputField';

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem 1rem 0 0;
  background-color: #dcddfc;
  padding: 1.5rem;
  padding-bottom: 2rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 1rem;
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')}
  ${getShadow('MD')}
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const AddWord = ({ onBack, addToWords, onNext, basicsData }) => {
  const [currWord, setCurrWord] = useState({
    language01: '',
    language02: '',
    description: '',
  });

  const handleChange = (evt) => {
    setCurrWord({ ...currWord, [evt.target.name]: evt.target.value });
  };

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      addToWords(currWord);
      setCurrWord({
        language01: '',
        language02: '',
        description: '',
      });
      document.getElementById('first_field').focus();
    }
  };

  if (!basicsData) {
    return null;
  }

  return (
    <>
      <TopContainer>
        <Header>
          <h1>{basicsData.title}</h1>
          <h2>Add new word</h2>
        </Header>
      </TopContainer>
      <CardContainer>
        <InfoBlock>
          <InputBlock>
            <InputTitle>
              <h3>{basicsData.language01}</h3>
            </InputTitle>
            <InputField
              placeholder='Word'
              name='language01'
              inputFieldId='first_field'
              onInput={handleChange}
              onKeyDown={handleKeyDown}
              customValue={currWord.language01}
            />
          </InputBlock>
          <InputBlock>
            <InputTitle>
              <h3>{basicsData.language02}</h3>
            </InputTitle>
            <InputField
              placeholder='Translation'
              name='language02'
              onInput={handleChange}
              onKeyDown={handleKeyDown}
              customValue={currWord.language02}
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
              onKeyDown={handleKeyDown}
              customValue={currWord.description}
            />
          </InputBlock>
        </InfoBlock>
        <NextStepContainer>
          <Button
            fullWidth
            colorOverride='notificationSuccess'
            onClick={() => {
              addToWords(currWord);
              setCurrWord({
                language01: '',
                language02: '',
                description: '',
              });
            }}
          >
            Add
          </Button>
        </NextStepContainer>
        <ButtonContainer>
          <Button fullWidth onClick={onBack} colorOverride='notificationError'>
            Back
          </Button>
          <Divider />
          <Button
            fullWidth
            onClick={onNext}
            colorOverride='notificationSuccess'
          >
            Next
          </Button>
        </ButtonContainer>
      </CardContainer>
    </>
  );
};

export default AddWord;
