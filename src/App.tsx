import React, { useState } from "react";
import QuestionCard from "./components/Question";
import { Difficulty, QuestionState, fetchQuizQuestions } from "./triviaAPI";
import Select from "react-select";

import { Wrapper, GlobalStyle } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const optionsDifficulty = [
  { label: Difficulty.EASY, value: Difficulty.EASY },
  { label: Difficulty.MEDIUM, value: Difficulty.MEDIUM },
  { label: Difficulty.HARD, value: Difficulty.HARD },
];

console.log(optionsDifficulty);

const options = [
  { label: "Any Category", value: "any" },

  { label: "General Knowledge", value: "9" },
  { label: "Entertainment - Books", value: "10" },
  { label: "Entertainment - Film", value: "11" },
  { label: "Entertainment - Music", value: "12" },
  { label: "Entertainment - Musicals &amp; Theatres", value: "13" },
  { label: "Entertainment - Television", value: "14" },
  { label: "Entertainment - Video Games", value: "15" },
  { label: "Entertainment - Board Games", value: "16" },
  { label: "Science &amp; Nature", value: "17" },
  { label: "Science - Computers", value: "18" },
  { label: "Science - Mathematics", value: "19" },
  { label: "Mythology", value: "20" },
  { label: "Sports", value: "21" },
  { label: "Geography", value: "22" },
  { label: "History", value: "23" },
  { label: "Politics", value: "24" },
  { label: "Art", value: "25" },
  { label: "Celebrities", value: "26" },
  { label: "Animals", value: "27" },
  { label: "Vehicles", value: "28" },
  { label: "Entertainment - Comics", value: "29" },
  { label: "Science - Gadgets", value: "30" },
  { label: "Entertainment - Japanese Anime &amp; Manga", value: "31" },
  { label: "Entertainment - Cartoon &amp; Animations", value: "32" },
  { label: "Any Category", value: "30" },
];

const TOTAL_QUESTIONS = 10;

let categorySelect: any;
let diffucultySelect: any;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState("any");
  const [diffculty, setDiffculty] = useState("easy");

  const changeCategory = (event: any) => {
    setCategory(event.label);
    categorySelect = event.value;
    console.log(event.label);
  };

  const changeDiffculty = (event: any) => {
    setDiffculty(event.label);
    diffucultySelect = event.value;
    console.log(event.label);
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      diffucultySelect,
      categorySelect
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    console.log("userAnswers.length:");
    console.log(userAnswers.length);

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <>
      <GlobalStyle />

      <Wrapper>
        <h1>React Quiz</h1>

        {userAnswers.length === 9 && (
          <>
            <button className="start" onClick={startTrivia}>
              Play again
            </button>

            <p className="score">
              Your Final Score is: {(score / 10) * 100}% You answered {score}{" "}
              question correctly
            </p>
          </>
        )}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <Select
              name="trivia_category"
              className="form-control"
              placeholder="Choose Category"
              onChange={changeCategory}
              options={options}
            />
            <Select
              name="trivia_difficulty"
              className="form-control"
              placeholder="Select Difficulty"
              onChange={changeDiffculty}
              options={optionsDifficulty}
            />

            <button className="start" onClick={startTrivia}>
              Start Game
            </button>
          </>
        ) : null}

        {userAnswers.length !== 9 && !gameOver ? (
          <div>
            <p className="score">
              Category: {category}
              <br />
              Your Score: {(score / 10) * 100}%
            </p>
          </div>
        ) : null}

        {loading && <p>Loading Questions...</p>}

        {!loading && !gameOver && userAnswers.length !== 9 && (
          <QuestionCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        userAnswers.length !== 9 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
