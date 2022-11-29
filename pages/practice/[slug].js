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

const ResultsTable = styled.table`
  width: 100%;
  height: 100%;
`;

const TableCell = styled.td`
  width: 100%;
  height: 100%;
`;

const BasicPractice = () => {
  const [data, setData] = useState(null);
  const [wordsStatus, setWordsStatus] = useState(null);
  const [view, setView] = useState('start');

  const router = useRouter();

  const { user } = useAuthContext();

  const id = router.query.slug;

  const getData = async () => {
    await axios
      .get(`/api/cards/${id}`, { params: { userUid: user.uid } })
      .then((res) => {
        setData(res.data);
        console.log('data: ', res.data);

        const tempWords = {};
        res.data.words.forEach((word) => {
          tempWords[word.uid] = {
            completed: false,
            repetitionNumber: 0,
            easiness: 2.5,
            interval: 0,
            grade: 0,
            guesses: [],
            description: word.description,
            translation: word.translation,
            word: word.word,
          };
        });
        setWordsStatus(tempWords);
      });
  };

  useEffect(() => {
    if (id && user) {
      getData();
    }
  }, [id, user]);

  console.log('words status: ', wordsStatus);

  const handleSubmit = useCallback(
    async (gradedData) => {
      if (user) {
        const docData = {
          gradedData: gradedData,
          author: {
            uid: user.uid,
            displayName: user.displayName,
          },
        };

        await axios.post(`/api/results/${id}`, { ...docData });
      }
    },
    [user, id]
  );

  const gradeWords = useCallback(() => {
    const gradedWords = {};
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
    });
    console.log(gradedWords);
    handleSubmit(gradedWords);
  }, [wordsStatus, handleSubmit]);

  return (
    <div>
      <CardContainer>
        <h1>Basic practice</h1>
        <h3>
          Practice set: {wordsStatus && Object.keys(wordsStatus).length} words
        </h3>
        {view === 'start' && (
          <Button onClick={() => setView('progress')}>START</Button>
        )}
      </CardContainer>
      {view === 'start' && <StartView blocks={data?.blocks} />}
      {view === 'progress' && (
        <ProgressView
          data={data}
          wordsStatus={wordsStatus}
          setSuccessView={() => {
            console.log('setting view success');
            gradeWords();
            setView('success');
          }}
        />
      )}
      {view === 'success' && (
        <>
          <CardContainer>
            <h1>Good job you are done!</h1>
            <h2>Results: </h2>

            <Link href='/'>
              <a>Return Home</a>
            </Link>
            <Button onClick={() => gradeWords()}>Send save</Button>
          </CardContainer>
          <CardContainer>
            {Object.keys(wordsStatus).map((key) => {
              return (
                <ResultsTable key={`row - ${key}`}>
                  <TableCell>{wordsStatus[key].word}</TableCell>
                  <TableCell>{wordsStatus[key].translation}</TableCell>
                  <TableCell>Grade: {wordsStatus[key].grade}</TableCell>
                  <TableCell>Easiness: {wordsStatus[key].easiness}</TableCell>
                </ResultsTable>
              );
            })}
          </CardContainer>
        </>
      )}
    </div>
  );
};

export default BasicPractice;
