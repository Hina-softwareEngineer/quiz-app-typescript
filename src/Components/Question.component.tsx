import React from "react";
import "./Question.style.css";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNum: number;
  totalQuestions: number;
};

export const Question: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => {
  return (
    <div className="questionBox">
      <p>
        Question No : {questionNum} / {totalQuestions}
      </p>

      <p>{question}</p>

      {answers.map((ans, index) => (
        <div className="answers" key={index}>
          <button disabled={userAnswer} value={ans} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: ans }} />
          </button>
        </div>
      ))}
    </div>
  );
};
