/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';

// function Title(props) {
//   return (
//     <h1>
//       {props.children}
//     </h1>
//   )
// }

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [nome, setName] = React.useState('');
  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form onSubmit={function (event) {
              event.preventDefault();
              router.push(`/quiz?name=${nome}`);
              console.log('Só vamos');
            }}
            >
              <input
                type="text"
                placeholder="Diz ai seu nome"
                onChange={function(event) {
                  setName(event.target.value);
                }}
              />
              <button type="submit" disabled={nome.length <= 0}>
                Jogar 
                {nome}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quizes maneiros para ficarem de olho</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Veja esses quizes que são fora de serie que o pessoal da Imersão React da Alura fizeram:</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/LucasCascao/cine-quiz" />
    </QuizBackground>
  );
}
