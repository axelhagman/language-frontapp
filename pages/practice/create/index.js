import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import getColor from 'theme/getColor';
import { useAuthContext } from 'context/auth';

import Basics from './components/BasicInfoView';
import AddWord from './components/AddWord';
import SetInfo from './components/SetInfo';

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
  const [basicsData, setBasicsData] = useState({
    title: '',
    language01: '',
    language02: '',
    description: '',
  });
  const [wordsData, setWordsData] = useState([]);

  const { user } = useAuthContext();

  const handleAddToWords = (newWord) => {
    setWordsData([...wordsData, newWord]);
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
            <SetInfo wordsData={wordsData} basicsData={basicsData} />
          </>
        );
      case 'confirm':
        return (
          <>
            <SetInfo wordsData={wordsData} basicsData={basicsData} />
            <NextButton onClick={() => handleSubmit()}>
              <h2>Confirm</h2>
            </NextButton>
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

  return (
    <Container>
      <h1>Create new</h1>
      {getContent()}
    </Container>
  );
};

export default Create;
