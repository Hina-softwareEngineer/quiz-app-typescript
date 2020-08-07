import React, { useState } from "react";
import { shuffleArray } from "./utils/shuffleArray";
import "./App.css";

function App() {
  const [datafetch, setDatafetch] = useState([{ question: "question" }]);
  const [shuffledata, setShuffleData] = useState({});

  const fetchData = async () => {
    console.log("fetchData");
    const data = await fetch(
      "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple"
    );
    let response = await data.json();
    setDatafetch(response.results);
    // console.log(response, response.results, " response is good");
    let arrayShuffle: object[] = shuffleArray(response.results);
    setShuffleData(arrayShuffle);
  };

  console.log("hello", datafetch, shuffledata);

  return (
    <div className="App">
      <h1>Quiz App</h1>

      <button onClick={fetchData}>Start</button>

      {datafetch || datafetch.map((question) => <div>{question.question}</div>)}

      <h2>Shuffle</h2>
      {/* {shuffledata && shuffledata.map((question) => <div>{question.question}</div>)} */}
    </div>
  );
}

export default App;
