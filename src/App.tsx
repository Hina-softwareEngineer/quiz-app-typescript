import React, { useState } from "react";
import { fetchData, Difficulty, QuestionState } from "./utils/FetchingData";
import "./App.css";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {};

  return (
    <div className="App">
      <h1>Quiz App</h1>

      <button onClick={startQuiz}>Start</button>

      <h2>Shuffle</h2>
    </div>
  );
}

export default App;
