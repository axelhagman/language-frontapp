import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

import { useAuthContext } from 'utils/auth';

import Button from 'components/Button';
import Basics from 'components/Create/BasicInfoView';
import AddWord from 'components/Create/AddWord';
import SetInfo from 'components/Create/SetInfo';

const Container = styled.div``;

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

  const router = useRouter();

  const { user } = useAuthContext();

  const handleAddToWords = (newWord) => {
    setWordsData([...wordsData, newWord]);
  };

  const handleRemoveWord = (removeWord) => {
    console.log(wordsData, removeWord);
    const tempWordData = wordsData.filter(
      (wordData) => wordData !== removeWord
    );
    console.log(tempWordData);
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

      await axios.post('/api/deck/create', { ...docData }).then((resp) => {
        if (resp.status === 200) {
          router.push('/practice');
        }
      });
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
