import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

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

const AddWord = ({ onBack, addToWords, onNext, basicsData }) => {
  const [currWord, setCurrWord] = useState({
    word: '',
    translation: '',
    description: '',
  });

  const handleChange = (evt) => {
    setCurrWord({ ...currWord, [evt.target.name]: evt.target.value });
  };

  console.log(currWord);

  return (
    <>
      <InfoBlock>
        <Header>
          <h2>Content</h2>
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
            <h3>Description</h3>
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
        <NextButton onClick={() => addToWords(currWord)}>
          <h2>Add</h2>
        </NextButton>
      </NextStepContainer>
      <ButtonContainer>
        <NextButton onClick={onBack}>
          <h2>Back</h2>
        </NextButton>
        <Divider />
        <NextButton onClick={onNext}>
          <h2>Next</h2>
        </NextButton>
      </ButtonContainer>
    </>
  );
};

export default AddWord;
