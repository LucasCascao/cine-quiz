import React from 'react';
import PropTypes from 'prop-types'

import Widget from '../Widget';
import Button from '../Button';
import AlternativesForm from '../AlternativesForm'

function QuestionWidget({ question, questionIndex, totalQuestions, addResult ,onSubmit }) {

  const NO_QUESTION_SELECTED = undefined;
  const NO_QUESTION_SUBMITTED = false;
  const QUESTION_SUBMITTED = true;

  const [selectedAlternative, setSelectedAlternative] = React.useState(NO_QUESTION_SELECTED);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(NO_QUESTION_SUBMITTED);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        <h3>
        {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.Description}
        </p>
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionSubmitted(QUESTION_SUBMITTED);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmitted(NO_QUESTION_SUBMITTED);
            setSelectedAlternative(NO_QUESTION_SELECTED);
          }, 3 * 1000)
        }}>
          {question.alternatives.map((alternative, alternativeIndex) =>  {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmitted && isCorrect && (<p>Você acertou!</p>)}
          {isQuestionSubmitted && !isCorrect && (<p>Você errou!</p>)}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

/*QuestionWidget.propTypes = {
    question: PropTypes.object.isRequired,
    questionIndex: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
}*/

export default QuestionWidget;