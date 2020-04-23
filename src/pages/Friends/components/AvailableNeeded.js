import React from 'react';
import { Column } from '../../../globalComponents';

import PersonCard from './PersonCard';
import { MainPhrase, MainTab } from '../styledComponents';
import { Grid } from './PersonCard/styles';
import ErrorMessage from './ErrorMessage';

export default function AvailableNeeded({ needyPeople, errorMessage }) {
  return (
    <MainTab>
      {errorMessage ? (
        <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
      ) : needyPeople.length === 0 ? (
        <ErrorMessage
          isHelper={true}
          errorMessage={
            'Não há ninguém na sua região que você possa ajudar.\nAdote mais categorias para encontrar mais pessoas!'
          }
        ></ErrorMessage>
      ) : (
        <>
          <MainPhrase>
            <strong style={{ fontSize: 'inherit' }}>
              {needyPeople.length} vizinho(s){' '}
            </strong>
            combinam com o que você pode
            <strong style={{ fontSize: 'inherit' }}> ajudar!</strong>
          </MainPhrase>
          <Grid>
            {needyPeople.map((person) => (
              <PersonCard key={person.userName} person={person}>
                precisa de ajuda com:
              </PersonCard>
            ))}
          </Grid>
        </>
      )}
    </MainTab>
  );
}
