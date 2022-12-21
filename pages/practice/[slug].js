import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

import { useAuthContext } from 'utils/auth';
import InputField from 'components/Create/InputField';
import Button from 'components/Button';
import { distanceProm } from 'utils/DL';
import getColor from 'theme/getColor';
import getShadow from 'theme/getShadow';
import StartView from 'components/Practice/StartView';
import ProgressView from 'components/Practice/ProgressView';
import SM2 from 'utils/SM-2';
import useDeck from 'utils/hooks/useDeck';

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

const ResultsBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const ResultsRow = styled.table`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const TableCell = styled.td`
  width: 25%;
  height: 100%;
`;

const checkDateToAddWord = (word) => {
  if (new Date(word.nextDate).getDate() - new Date().getDate() < 5) {
    return true;
  } else {
    return false;
  }
};

const handleData = (data) => {
  if (data) {
    // If the user has practiced before then sort the started words by closest practice date and add them to userData
    let userData = null;
    if (data.userDeckData?.length > 0) {
      console.log(data.userDeckData);
      userData = {};
      const sortedWords = data.userDeckData.sort((a, b) => {
        return new Date(a.nextDate) > new Date(b.nextDate);
      });

      console.log('Sorted words: ', sortedWords);
      sortedWords.forEach((word) => {
        userData[word.id] = {
          ...word,
        };
      });
    }

    const tempWords = {};

    let startedWords = null;
    let newWords = null;

    // If the user has practiced this set before then sort words into the started ones and the new ones
    if (userData && Object.keys(userData).length > 0) {
      startedWords = data.words.filter((word) =>
        Object.keys(userData).includes(word.uid)
      );
      newWords = data.words.filter(
        (word) => !Object.keys(userData).includes(word.uid)
      );
    } else {
      newWords = data.words;
    }
    console.log('Started words: ', startedWords);
    console.log('New words: ', newWords);

    // Add words from started words and then new words to the practice set until the practice set
    // contains the desired ammout of words (currently 5)
    if (startedWords) {
      startedWords.every((word) => {
        if (Object.keys(tempWords).length < 5) {
          if (
            userData &&
            Object.keys(userData).includes(word.uid) &&
            checkDateToAddWord(userData[word.uid])
          ) {
            tempWords[word.uid] = {
              completed: false,
              repetitionNumber: userData[word.uid].repetitionNumber,
              easiness: userData[word.uid].easiness,
              interval: userData[word.uid].interval,
              nextDate: userData[word.uid].nextDate,
              grade: 0,
              guesses: [],
              description: word.description,
              translation: word.language02,
              word: word.language01,
            };
          }
          return true;
        } else {
          return false;
        }
      });
    }
    // Adding from new words
    newWords.every((word) => {
      if (Object.keys(tempWords).length < 5) {
        tempWords[word.uid] = {
          completed: false,
          repetitionNumber: 0,
          easiness: 2.5,
          interval: 0,
          nextDate: null,
          grade: 0,
          guesses: [],
          description: word.description,
          translation: word.language02,
          word: word.language01,
        };
        return true;
      } else {
        return false;
      }
    });

    return tempWords;
  }
};

const BasicPractice = () => {
  // const [data, setData] = useState(null);
  const [wordsStatus, setWordsStatus] = useState(null);
  const [view, setView] = useState('start');
  const [data, setData] = useState(null);

  const router = useRouter();

  const { user } = useAuthContext();

  const id = router.query.slug;

  const getData = async (user) => {
    await axios
      .get(`/api/deck/${id}`, { params: { userUid: user.uid } })
      .then((res) => {
        setWordsStatus(handleData(res.data));
        setData(res.data);
      });
  };

  useEffect(() => {
    if (user) {
      getData(user);
    }
  }, [user]);

  console.log('words status: ', wordsStatus);

  const handleSubmit = useCallback(
    async (gradedData, closestDate) => {
      console.log(closestDate);
      if (user) {
        const docData = {
          gradedData: gradedData,
          user: {
            uid: user.uid,
            displayName: user.displayName,
          },
          nextPracticeDate: closestDate,
        };

        await axios.post(`/api/results/${id}`, { ...docData });
      }
    },
    [user, id]
  );

  const gradeWords = useCallback(() => {
    const gradedWords = {};
    let closestDate = null;
    if (user?.nextDates && Object.keys(user.nextDates).includes(id)) {
      closestDate = user.nextDates[id];
    }
    console.log(Object.entries(wordsStatus));
    Object.entries(wordsStatus).forEach((word) => {
      const ID = word[0];
      const wordData = word[1];

      const result = SM2({
        grade: wordData.grade,
        interval: wordData.interval,
        easiness: wordData.easiness,
        repetitionNumber: wordData.repetitionNumber,
      });
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + result.interval);
      nextDate.setHours(12, 0, 0, 0);
      gradedWords[ID] = { ...result, nextDate: nextDate };
      if (!closestDate || closestDate > nextDate) {
        closestDate = nextDate;
      }
    });
    console.log(gradedWords, closestDate);
    handleSubmit(gradedWords, closestDate);
  }, [wordsStatus, handleSubmit]);

  console.log(data);

  return (
    <div>
      <TopContainer>
        <h1>{data?.title ? data.title : ''}</h1>
        <h3 style={{ marginBottom: '1rem' }}>
          Practice set: {wordsStatus && Object.keys(wordsStatus).length} words
        </h3>
        {view === 'start' && (
          <Button onClick={() => setView('progress')}>Start Practice</Button>
        )}
      </TopContainer>
      {view === 'start' && <StartView blocks={data?.blocks} />}
      {view === 'progress' && (
        <>
          <ProgressView
            data={data}
            wordsStatus={wordsStatus}
            setSuccessView={() => {
              console.log('setting view success');
              gradeWords();
              setView('success');
            }}
          />
        </>
      )}
      {view === 'success' && (
        <>
          <CardContainer>
            <h1>Good job you are done!</h1>
            <h2>Results: </h2>
            <ResultsBlock>
              {Object.keys(wordsStatus).map((key) => {
                return (
                  <ResultsRow key={`row - ${key}`}>
                    <TableCell>{wordsStatus[key].word}</TableCell>
                    <TableCell>{wordsStatus[key].translation}</TableCell>
                    <TableCell>Grade: {wordsStatus[key].grade}</TableCell>
                    <TableCell>Easiness: {wordsStatus[key].easiness}</TableCell>
                  </ResultsRow>
                );
              })}
            </ResultsBlock>
            <Link href='/'>
              <a>
                <Button fullWidth colorOverride='notificationSuccess'>
                  Return Home
                </Button>
              </a>
            </Link>
          </CardContainer>
        </>
      )}
    </div>
  );
};

export default BasicPractice;
