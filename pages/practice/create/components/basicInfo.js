import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import getColor from 'theme/getColor';

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

const Basics = ({ onNext }) => {
  const [title, setTitle] = useState('');
  const [language01, setLanguage01] = useState();

  const handleChange = (evt) => {
    console.log(evt);
    setData(evt.target.value);
    // setData({ [evt.target.name]: evt.target.value, ...data });
  };

  console.log(data);
  return (
    <>
      <InfoBlock>
        <Header>
          <h2>Basic Info</h2>
        </Header>
        <InputBlock>
          <InputTitle>
            <h3>Title</h3>
          </InputTitle>
          <input
            placeholder='Title'
            name='title'
            onChange={handleChange}
            value={data.title}
          />
        </InputBlock>
        <InputBlock>
          <InputTitle>
            <h3>Languages</h3>
          </InputTitle>
          <input placeholder='Language' value={data.language01} />
          <input placeholder='Language' value={data.language02} />
        </InputBlock>
        <InputBlock>
          <InputTitle>
            <h3>Description (optional)</h3>
          </InputTitle>
          <input placeholder='Description' value={data.description} />
        </InputBlock>
      </InfoBlock>
      <NextStepContainer onClick={() => onNext(data)}>
        <NextButton>
          <h2>Next</h2>
        </NextButton>
      </NextStepContainer>
    </>
  );
};

export default Basics;
