import React from 'react';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import QuestionWidget from '../src/components/QuestionWidget'

import db from '../db.json'

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({results}) {
  const numberOfCorrectAnswers = results.filter((result) => result === true).length;
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultados
      </Widget.Header>
      <Widget.Content>
        <p>{`Você acertou ${numberOfCorrectAnswers} perguntas`}</p>
        <ul>
          {results.map((result, resultIndex) => {
            return (
              <li key={resultIndex}>
                {`#${resultIndex + 1} Resposta: ${result === true? 'Acertou' : 'Errou'}`}
              </li>
            )
          })}
        </ul>
      </Widget.Content>
    </Widget>
  );
}


function QuizPage() {

  //const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;
  const [results,setResults] = React.useState([]);

  function addResult(result) {
    setResults([...results, result]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if(nextQuestion < totalQuestions){
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            addResult={addResult}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget 
            results={results}
          />
        )}

      </QuizContainer>
    </QuizBackground>
  );
}

export default QuizPage;
