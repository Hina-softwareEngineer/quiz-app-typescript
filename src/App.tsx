import React, { useState } from "react";
import { fetchData, Difficulty, QuestionState } from "./utils/FetchingData";
import "./App.css";
import { Question } from "./Components/Question.component";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const Total_Questions = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchData(10, Difficulty.EASY, 21);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    if (nextQuestion === Total_Questions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  return (
    <div className="App">
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === Total_Questions ? (
        <button onClick={startQuiz}>Begin Quiz</button>
      ) : null}
      {!gameOver ? <p>Score : {score}</p> : null}
      {loading ? <p>Loading</p> : null}

      {!loading && !gameOver ? (
        <Question
          questionNum={number + 1}
          totalQuestions={Total_Questions}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== Total_Questions - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
}

export default App;
