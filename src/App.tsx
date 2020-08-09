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
  const [amount, setAmount] = useState(10);
  const [difficult, setDifficulty] = useState(Difficulty.EASY);
  const [category, setCategory] = useState(0);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchData(amount, difficult, category);
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
        <div>
          <select
            name="amount"
            id="amount"
            onChange={(e) => setAmount(+e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>

          <select
            name="difficulty"
            id="difficulty"
            onChange={(e) => {
              if (e.target.value === "easy") {
                setDifficulty(Difficulty.EASY);
              } else if (e.target.value === "medium") {
                setDifficulty(Difficulty.MEDIUM);
              } else {
                setDifficulty(Difficulty.HARD);
              }
            }}
          >
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
          </select>

          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(+e.target.value)}
          >
            <option value="0">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment : Books</option>
            <option value="11">Entertainment : Films</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science : Computers</option>
            <option value="19">Science : Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="27">Animals</option>
            <option value="23">History</option>
            <option value="30">Science : Gadgets</option>
          </select>
          <button onClick={startQuiz}>Begin Quiz</button>
        </div>
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
