import useGlobalContext from './hooks/useGlobalContext';
import { Loading, Modal, SetupForm } from './components';

function App() {
  const {
    isWaiting,
    isLoading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext();

  if (isWaiting) {
    return <SetupForm />;
  }

  if (isLoading) {
    return <Loading />;
  }

  const { question, correct_answer, incorrect_answers } = questions[index];
  const answers = [...incorrect_answers];

  // put correct answer in random index of answers array
  const tempIndex = Math.floor(Math.random() * answers.length);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />

      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct} / {index}
        </p>
        <article className="container">
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(correct_answer === answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="answer-btn"
                />
              );
            })}
          </div>
        </article>
        <button onClick={nextQuestion} className="next-question">
          next question
        </button>
      </section>
    </main>
  );
}
export default App;
