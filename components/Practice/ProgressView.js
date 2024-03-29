import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

import InputField from 'components/Create/InputField';
import getColor from 'theme/getColor';
import Button from 'components/Button';
import getShadow from 'theme/getShadow';
import { distanceProm } from 'utils/DL';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0 0 1rem 1rem;
  background-color: white;
  ${getShadow('MD')}
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 0.25rem;
  background-color: rgba(0, 0, 0, 0.04);
`;

const ProgressBar = styled.div`
  display: flex;
  width: ${({ progress }) => (progress ? `${progress}` : '0')}%;
  background-color: black;
  height: 100%;
  transition: all ease 0.5s;
`;

const InnerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const ButtonBlock = styled.div`
  display: flex;
  width: 100%;
  max-width: 20rem;
`;

const StatusMessage = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  background-color: ${getColor({ color: 'primary', opacity: 0.24 })};
  border-radius: 1rem;
  padding: 1rem;
`;

const successAnimation = keyframes`
0% {
  background-color: rgba(${getColor({
    color: 'notificationSuccess',
    asRgbNumbers: true,
  })}, 0);

}
30% {
  background-color: rgba(${getColor({
    color: 'notificationSuccess',
    asRgbNumbers: true,
  })}, 0.8);
}
70% {
  background-color: rgba(${getColor({
    color: 'notificationSuccess',
    asRgbNumbers: true,
  })}, 0.8);
}
100% {
  background-color: rgba(${getColor({
    color: 'notificationSuccess',
    asRgbNumbers: true,
  })}, 0);
}
`;

const failAnimation = keyframes`
0% {
  background-color: rgba(${getColor({
    color: 'notificationError',
    asRgbNumbers: true,
  })}, 0);

}
30% {
  background-color: rgba(${getColor({
    color: 'notificationError',
    asRgbNumbers: true,
  })}, 0.8);
}
70% {
  background-color: rgba(${getColor({
    color: 'notificationError',
    asRgbNumbers: true,
  })}, 0.8);
}
100% {
  background-color: rgba(${getColor({
    color: 'notificationError',
    asRgbNumbers: true,
  })}, 0);
}
`;

const WordAnimationContainer = styled.div`
  display: flex;
  .failActive {
    animation-name: ${failAnimation};
  }
  .successActive {
    animation-name: ${successAnimation};
  }
`;

const CurrentWord = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  algin-items: center;
  border-radius: 0.5rem;
  padding: 0.25rem 0.75rem;
  transition: all ease 0.5s;
  animation-iteration-count: 1;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
`;

// Max Grade 5 (Perfect recall)
// Lowest Grade 0 (Complete failure to recall information)
const gradeWord = (word) => {
  const { guesses } = word;

  let totalScore = 0;
  guesses.forEach((score) => {
    totalScore += score;
  });

  const averageScore = totalScore / guesses.length;

  return 5 - averageScore * (0.5 * guesses.length);
};

const ProgressView = ({ data, wordsStatus, setSuccessView }) => {
  const [currGuess, setCurrGuess] = useState('');
  const [guessClose, setGuessClose] = useState(false);
  const [failActive, setFailActive] = useState(false);
  const [successActive, setSuccessActive] = useState(false);
  const [currentWordId, setCurrentWordId] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (wordsStatus && data) {
      console.log(
        'Setting initial current word id: ',
        Object.keys(wordsStatus).length - 1
      );
      setCurrentWordId(
        Object.keys(wordsStatus)[
          Math.floor(Math.random() * (Object.keys(wordsStatus).length - 1))
        ]
      );
    }
  }, [data, wordsStatus]);

  console.log(wordsStatus[currentWordId]);

  const handleChange = (evt) => {
    setCurrGuess(evt.target.value);
  };

  const handleGuess = useCallback(async () => {
    const distanceRating = await distanceProm(
      wordsStatus[currentWordId].translation.toLowerCase(),
      currGuess.toLowerCase()
    );
    setGuessClose(false);
    const keys = Object.keys(wordsStatus);
    const remainingKeys = [];
    keys.forEach((key) => {
      if (wordsStatus[key].completed === false) {
        if (!(distanceRating === 0 && key === currentWordId)) {
          remainingKeys.push(key);
        }
      }
    });

    console.log('remaining keys: ', remainingKeys);

    setProgress(
      (Object.keys(wordsStatus).length - remainingKeys.length) /
        Object.keys(wordsStatus).length
    );

    let newWordId = null;
    if (remainingKeys.length > 1) {
      // Get random new word ID from remaining ID:s that is not the current wordID
      newWordId = remainingKeys.filter((key) => key !== currentWordId)[
        Math.floor(Math.random() * (remainingKeys.length - 1))
      ];
    } else if (remainingKeys.length === 1) {
      newWordId = remainingKeys[0];
    }

    if (distanceRating === 0) {
      // Correct guess

      wordsStatus[currentWordId].completed = true;
      wordsStatus[currentWordId].guesses.push(0);
      wordsStatus[currentWordId].grade = gradeWord(wordsStatus[currentWordId]);

      if (!newWordId) {
        setSuccessView();
      }

      setSuccessActive(true);
      setTimeout(() => {
        setSuccessActive(false);
        setCurrentWordId(newWordId);
        setCurrGuess('');
      }, 450);
    } else if (distanceRating === 1) {
      // Close guess

      wordsStatus[currentWordId].guesses.push(distanceRating);
      setGuessClose(true);
    } else {
      // Wrong guess
      wordsStatus[currentWordId].guesses.push(distanceRating);
      setFailActive(newWordId);
    }
  }, [currGuess, currentWordId, wordsStatus]);

  const handleContinue = useCallback(() => {
    setCurrentWordId(failActive);
    setCurrGuess('');
    setFailActive(false);
  }, [failActive]);

  const getAnimClassName = useCallback(() => {
    if (failActive) {
      return 'failActive';
    }
    if (successActive) {
      return 'successActive';
    }
    return '';
  }, [failActive, successActive]);

  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      if (failActive) {
        handleContinue();
      } else {
        handleGuess();
      }
    }
  };

  return (
    <CardContainer alignCenter>
      <ProgressBarContainer>
        <ProgressBar progress={progress * 100} />
      </ProgressBarContainer>
      <InnerCard>
        <WordAnimationContainer>
          {currentWordId && (
            <CurrentWord
              className={getAnimClassName()}
              guessFailed={failActive}
            >
              <h2>{wordsStatus[currentWordId].word}</h2>
            </CurrentWord>
          )}
        </WordAnimationContainer>
        <InputBlock>
          <InputField
            placeholder='translation'
            name='translation'
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            customValue={currGuess}
          />
        </InputBlock>
        {failActive && (
          <p>Correct answer: {wordsStatus[currentWordId].translation}</p>
        )}
        <ButtonBlock>
          {failActive ? (
            <Button
              colorOverride='notificationSuccess'
              fullWidth
              onClick={() => handleContinue()}
            >
              NEXT
            </Button>
          ) : (
            <Button
              colorOverride='notificationSuccess'
              fullWidth
              onClick={() => handleGuess()}
            >
              GUESS
            </Button>
          )}
        </ButtonBlock>
        {guessClose && (
          <StatusMessage>
            <h3>Close! Try again</h3>
          </StatusMessage>
        )}
      </InnerCard>
    </CardContainer>
  );
};

export default ProgressView;
