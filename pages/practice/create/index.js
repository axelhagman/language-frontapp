import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import getColor from 'theme/getColor';
import { useAuthContext } from 'utils/auth';

import Button from 'components/Button';
import Basics from 'components/Create/BasicInfoView';
import AddWord from 'components/Create/AddWord';
import SetInfo from 'components/Create/SetInfo';

const Container = styled.div`
  padding: 2rem;
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
  const [basicsData, setBasicsData] = useState({
    title: '',
    blockTitle: '',
    language01: '',
    language02: '',
    description: '',
  });
  const [wordsData, setWordsData] = useState([]);

  const { user } = useAuthContext();

  const handleAddToWords = (newWord) => {
    setWordsData([...wordsData, newWord]);
  };

  const handleRemoveWord = (removeWord) => {
    const tempWordData = wordsData.filter(
      (wordData) => wordData.word !== removeWord.word
    );
    setWordsData(tempWordData);
  };

  const handleSubmit = useCallback(async () => {
    if (user) {
      const docData = {
        ...basicsData,
        wordsData: [...wordsData],
        author: {
          uid: user.uid,
          displayName: user.displayName,
        },
      };

      await axios.post('/api/cards', { ...docData });
    }
  }, [user, wordsData, basicsData]);

  const getContent = useCallback(() => {
    switch (view) {
      case 'basics':
        return (
          <Basics
            onNext={(data) => {
              setBasicsData(data);
              setView('content');
            }}
            initialData={basicsData}
          />
        );
      case 'content':
        return (
          <>
            <AddWord
              onNext={() => {
                setView('confirm');
              }}
              onBack={() => {
                setView('basics');
              }}
              initialData={wordsData}
              basicsData={basicsData}
              addToWords={(newWord) => handleAddToWords(newWord)}
            />
            <SetInfo
              wordsData={wordsData}
              basicsData={basicsData}
              removeWord={(word) => handleRemoveWord(word)}
            />
          </>
        );
      case 'confirm':
        return (
          <>
            <SetInfo wordsData={wordsData} basicsData={basicsData} />
            <ButtonContainer>
              <Button
                fullWidth
                colorOverride='notificationError'
                onClick={() => setView('content')}
              >
                Back
              </Button>
              <Divider />
              <Button
                fullWidth
                colorOverride='notificationSuccess'
                onClick={() => handleSubmit()}
              >
                Confirm/Save
              </Button>
            </ButtonContainer>
          </>
        );
      case 'success':
        return (
          <>
            <h2>Success</h2>
          </>
        );
      default:
        return (
          <Basics
            onNext={(data) => {
              setBasicsData(data);
              setView('content');
            }}
            initialData={basicsData}
          />
        );
    }
  }, [view, wordsData, basicsData]);

  return <Container>{getContent()}</Container>;
};

export default Create;
