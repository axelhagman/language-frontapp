import React from 'react';
import styled from 'styled-components';
import getColor from 'theme/getColor';

import getShadow from 'theme/getShadow';
import Button from 'components/Button';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ noBlock }) =>
    noBlock
      ? ``
      : `border-radius: 1rem;
  background-color: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  ${({ alignCenter }) => (alignCenter ? 'align-items: center;' : '')}
  ${getShadow('MD')}`}
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  dispay: flex;
  flex-direction: column;
  margin-right: auto;
`;

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

const Tag = styled.div`
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
  justify-content: space-between;
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

const SetInfo = ({ wordsData, basicsData, removeWord, noBlock }) => {
  if (!wordsData || !basicsData) {
    return null;
  }
  return (
    <CardContainer noBlock={noBlock}>
      <HeaderBlock>
        <Column>
          <h1>{basicsData.blockTitle}</h1>
          <h2>{basicsData.description}</h2>
        </Column>
        <Tag>
          <h2>Words: {wordsData.length}</h2>
        </Tag>
      </HeaderBlock>
      <StyledColumns>
        <TableHeader>
          <LanguageContainer>
            <Tag>
              <h2>{basicsData.language01}</h2>
            </Tag>
          </LanguageContainer>
          <LanguageContainer>
            <Tag>
              <h2>{basicsData.language02}</h2>
            </Tag>
          </LanguageContainer>
          <Empty />
        </TableHeader>
        {wordsData.map((word, index) => {
          return (
            <WordRow key={`word-${word.language01}-${index}`}>
              <WordContainer>
                <h3>{word.language01}</h3>
              </WordContainer>
              <WordContainer>
                <h3>{word.language02}</h3>
              </WordContainer>
              <ButtonsContainer>
                <Button
                  colorOverride='notificationError'
                  onClick={() => removeWord(word)}
                >
                  Remove
                </Button>
                <Tag>
                  <h3>{index + 1}</h3>
                </Tag>
              </ButtonsContainer>
            </WordRow>
          );
        })}
      </StyledColumns>
    </CardContainer>
  );
};

export default SetInfo;
