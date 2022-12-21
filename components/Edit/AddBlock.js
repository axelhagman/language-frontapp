import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useAuthContext } from 'utils/auth';
import getColor from 'theme/getColor';
import getShadow from 'theme/getShadow';
import IconEdit from 'public/icons/iconEdit';
import IconAdd from 'public/icons/iconAdd';
import InputField from 'components/Create/InputField';
import Button from 'components/Button';
import SetInfo from 'components/Create/SetInfo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: ${({ width }) => (width ? `${width}` : '100%')};
`;

const InputTitle = styled.div`
  margin-bottom: 0.5rem;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  min-width: 2rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const AddBlock = ({ setId, onClose, practiceSetData }) => {
  const [data, setData] = useState({
    blockTitle: '',
    language01: practiceSetData.language01,
    language02: practiceSetData.language02,
  });
  const [currWord, setCurrWord] = useState({
    language01: '',
    language02: '',
    description: '',
  });
  const [wordsData, setWordsData] = useState([]);

  console.log(wordsData);

  const { user } = useAuthContext();

  const handleChange = (evt) => {
    setData({ ...data, [evt.target.name]: evt.target.value });
  };

  const handleWordChange = (evt) => {
    setCurrWord({ ...currWord, [evt.target.name]: evt.target.value });
  };

  const addToWords = (newWord) => {
    setWordsData([...wordsData, newWord]);
  };

  const handleRemoveWord = (removeWord) => {
    const tempWordData = wordsData.filter(
      (wordData) => wordData.word !== removeWord.word
    );
    setWordsData(tempWordData);
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

  const handleSubmit = useCallback(async () => {
    if (user && setId) {
      const docData = {
        ...data,
        practiceSetData,
        wordsData: [...wordsData],
        author: {
          uid: user.uid,
          displayName: user.displayName,
        },
      };

      await axios.post(`/api/cards/addBlock/${setId}`, { ...docData });
    }
  }, [user, setId, wordsData, data]);

  return (
    <Container>
      <h2>New Block</h2>
      <p onClick={() => onClose()}>Close</p>
      <InputBlock width='calc(50% - 1rem)'>
        <InputField
          placeholder='Block Title'
          name='blockTitle'
          onInput={handleChange}
          customValue={data.blockTitle}
        />
      </InputBlock>
      <Line />
      <InfoBlock>
        <Row>
          <InputBlock>
            <InputTitle>
              <h3>{data.language01}</h3>
            </InputTitle>
            <InputField
              placeholder='Word'
              name='language01'
              inputFieldId='first_field'
              onInput={handleWordChange}
              onKeyDown={handleKeyDown}
              customValue={currWord.language01}
            />
          </InputBlock>
          <Divider />
          <InputBlock>
            <InputTitle>
              <h3>{data.language02}</h3>
            </InputTitle>
            <InputField
              placeholder='Translation'
              name='language02'
              onInput={handleWordChange}
              onKeyDown={handleKeyDown}
              customValue={currWord.language02}
            />
          </InputBlock>
        </Row>
        <InputBlock>
          <InputTitle>
            <h3>Description (optional)</h3>
          </InputTitle>
          <InputField
            placeholder='Description'
            name='description'
            onInput={handleWordChange}
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
      <Button
        fullWidth
        onClick={() => {
          handleSubmit();
        }}
        colorOverride='notificationSuccess'
      >
        Next
      </Button>
      <SetInfo
        noBlock
        wordsData={wordsData}
        basicsData={practiceSetData}
        removeWord={(word) => handleRemoveWord(word)}
      />
    </Container>
  );
};

export default AddBlock;
