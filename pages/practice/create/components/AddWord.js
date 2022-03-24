import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';
import Button from 'components/Button';

import InputField from './InputField';

const Container = styled.div``;

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

  return (
    <>
      <InfoBlock>
        <Header>
          <h2>Add new word</h2>
        </Header>
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
        <Button fullWidth onClick={onBack}>
          Back
        </Button>
        <Divider />
        <Button fullWidth onClick={onNext}>
          Next
        </Button>
      </ButtonContainer>
    </>
  );
};

export default AddWord;
