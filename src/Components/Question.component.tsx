import React from "react";

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
    <div>
      <p>
        Question : {questionNum} / {totalQuestions}
      </p>

      <p>{question}</p>

      {answers.map((ans) => {
        <div corrrec>
          <button disabled={userAnswer} value={ans} onClick={callback}>
            {ans}
          </button>
        </div>;
      })}
    </div>
  );
};
