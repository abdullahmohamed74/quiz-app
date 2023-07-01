import { createContext, useState } from 'react';
import axios from 'axios';

// const testURL =
//   'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

//from opentdb.com
const categories = {
  sports: 21,
  history: 23,
  politics: 24,
};

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [isWaiting, setIsWaiting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const fetchQuestions = async (url) => {
    setIsWaiting(false);
    setIsLoading(true);
    try {
      const { data } = await axios.get(url);
      if (data.results.length > 0) {
        setQuestions(data.results);
        setIsLoading(false);
        setIsWaiting(false);
        setError(false);
      } else {
        setError(true);
        setIsWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // show the next question in the "questions array" by increasing the "index"
  // that is used to to access the question from the array
  // the click after showing the last question will open the modal and reset the "index" to ZERO
  const nextQuestion = () => {
    setIndex((current) => {
      const newIndex = current + 1;
      if (newIndex > questions.length - 1) {
        openModal();
        return 0;
      }
      return newIndex;
    });
  };

  // if the user clicks on the correct answer
  // increase the "correct" state by one
  // whether the user clicks on the correct answer or not ===> move to the next question
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((current) => current + 1);
    }

    nextQuestion();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  // after closing the modal
  // start from the beginning show the form and reset the "correct" answers to zero
  const closeModal = () => {
    setIsModalOpen(false);
    setCorrect(0);
    setIsWaiting(true);
  };

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // call fetch function after submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categories[category]}&difficulty=${difficulty}&type=multiple`;

    fetchQuestions(url);
  };

  return (
    <GlobalContext.Provider
      value={{
        isWaiting,
        isLoading,
        questions,
        index,
        correct,
        isModalOpen,
        error,
        quiz,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalProvider };
export default GlobalContext;
