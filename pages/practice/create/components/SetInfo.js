import React from 'react';
import styled from 'styled-components';
import getColor from 'theme/getColor';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #eeeeee;
  margin-top: 2rem;
`;

const HeaderBlock = styled.div``;

const StyledColumns = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
`;

const TableHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1rem;
`;

const LanguageContainer = styled.div`
  min-width: 40%;
`;

const LagnuageTag = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #eeeeee;
  width: fit-content;
`;

const Empty = styled.div`
  min-width: 20%;
`;

const WordRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #eeeeee;
  padding: 1rem 0;
`;

const WordContainer = styled.div`
  width: 40%;
  padding: 0 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 20%;
`;

const Removebutton = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: #eeeeee;
  transition: all ease 0.25s;
  &:hover {
    background-color: ${getColor({ color: 'notificationError' })};
  }
`;

const SetInfo = ({ wordsData, basicsData }) => {
  return (
    <Container>
      <HeaderBlock>
        <h1>{basicsData.title}</h1>
        <h2>{basicsData.description}</h2>
      </HeaderBlock>
      <StyledColumns>
        <TableHeader>
          <LanguageContainer>
            <LagnuageTag>
              <h2>{basicsData.language01}</h2>
            </LagnuageTag>
          </LanguageContainer>
          <LanguageContainer>
            <LagnuageTag>
              <h2>{basicsData.language02}</h2>
            </LagnuageTag>
          </LanguageContainer>
          <Empty />
        </TableHeader>
        {wordsData.map((word, index) => {
          return (
            <WordRow key={`word-${word.word}-${index}`}>
              <WordContainer>
                <h3>{word.word}</h3>
              </WordContainer>
              <WordContainer>
                <h3>{word.translation}</h3>
              </WordContainer>
              <ButtonsContainer>
                <Removebutton />
              </ButtonsContainer>
            </WordRow>
          );
        })}
      </StyledColumns>
    </Container>
  );
};

export default SetInfo;
