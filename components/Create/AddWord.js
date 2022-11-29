import React, { useState, useCallback } from 'react';
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
    word: '',
    translation: '',
    description: '',
  });

  const handleChange = (evt) => {
    setCurrWord({ ...currWord, [evt.target.name]: evt.target.value });
  };

  if (!basicsData) {
    return null;
  }

  return (
    <>
      <CardContainer>
        <Header>
          <h1>{basicsData.title}</h1>
          <h2>Add new word</h2>
        </Header>
      </CardContainer>
      <CardContainer>
        <InfoBlock>
          <InputBlock>
            <InputTitle>
              <h3>{basicsData.language01}</h3>
            </InputTitle>
            <InputField
              placeholder='Word'
              name='word'
              onInput={handleChange}
              customValue={currWord.word}
            />
          </InputBlock>
          <InputBlock>
            <InputTitle>
              <h3>{basicsData.language02}</h3>
            </InputTitle>
            <InputField
              placeholder='Translation'
              name='translation'
              onInput={handleChange}
              customValue={currWord.translation}
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
                word: '',
                translation: '',
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
