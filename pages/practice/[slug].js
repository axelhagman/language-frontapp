import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

import InputField from 'pages/practice/create/components/InputField';
import Button from 'components/Button';
import { distanceProm } from 'utils/DL';
import getColor from 'theme/getColor';

const ProgressContainer = styled.div`
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

const StatusMessage = styled.div`
  display: flex;
  width: 100%;
  background-color: ${getColor({ color: 'primary', opacity: 0.24 })};
  border-radius: 1rem;
  padding: 1rem;
`;

const BasicPractice = () => {
  const [data, setData] = useState(null);
  const [wordsStatus, setWordsStatus] = useState(null);
  const [currentWordId, setCurrentWordId] = useState(null);
  const [view, setView] = useState('start');
  const [currGuess, setCurrGuess] = useState('');
  const [guessClose, setGuessClose] = useState(false);
  const router = useRouter();

  const id = router.query.slug;

  const getData = async () => {
    await axios.get(`/api/cards/${id}`).then((res) => {
      setData(res.data);

      const tempWords = {};
      res.data.words.forEach((word) => {
        tempWords[word.uid] = {
          completed: false,
          fails: 0,
          description: word.description,
          translation: word.translation,
          word: word.word,
        };
      });
      setWordsStatus(tempWords);
      setCurrentWordId(
        Object.keys(tempWords)[
          Math.floor(Math.random() * (Object.keys(tempWords).length - 1))
        ]
      );
    });
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const handleChange = (evt) => {
    setCurrGuess(evt.target.value);
  };

  const handleGuess = useCallback(async () => {
    const distanceRating = await distanceProm(
      wordsStatus[currentWordId].translation.toLowerCase(),
      currGuess.toLowerCase()
    );
    setGuessClose(false);
    console.log(distanceRating);
    if (distanceRating === 0) {
      wordsStatus[currentWordId].completed = true;
      const keys = Object.keys(wordsStatus);
      const remainingKeys = [];
      keys.forEach((key) => {
        if (wordsStatus[key].completed === false) {
          remainingKeys.push(key);
        }
      });

      const newWordId =
        remainingKeys[Math.floor(Math.random() * (remainingKeys.length - 1))];

      console.log(newWordId);

      if (!newWordId) {
        setView('success');
      }
      setCurrentWordId(newWordId);
      setCurrGuess('');
    } else if (distanceRating === 1) {
      setGuessClose(true);
    } else {
      console.log('wrong! Try again!');
    }
  }, [currGuess, currentWordId, wordsStatus]);

  return (
    <div>
      <h1>Basic practice</h1>
      {view === 'start' && (
        <Button onClick={() => setView('progress')}>START</Button>
      )}
      {view === 'progress' && (
        <ProgressContainer>
          <p>{data.language01}</p>
          <h2>{wordsStatus[currentWordId].word}</h2>
          <InputBlock>
            <InputTitle>
              <h3>Translation</h3>
            </InputTitle>
            <InputField
              placeholder='translation'
              name='translation'
              onInput={handleChange}
              customValue={currGuess}
            />
          </InputBlock>
          <Button onClick={() => handleGuess()}>GUESS</Button>
          {guessClose && (
            <StatusMessage>
              <h3>Close! Try again</h3>
            </StatusMessage>
          )}
        </ProgressContainer>
      )}
      {view === 'success' && (
        <>
          <h1>Good job you are done!</h1>
          <Link href='/'>
            <a>Return Home</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default BasicPractice;
