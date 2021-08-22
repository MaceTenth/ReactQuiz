import React, { useState } from "react";
import QuestionCard from "./components/Question";
import { QuestionState, fetchQuizQuestions } from "./triviaAPI";
import Select from "react-select";
import { options, optionsDifficulty } from "./options";
import { Wrapper, GlobalStyle } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 11;

let categorySelect: any;
let diffucultySelect: any;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [category, setCategory] = useState("");
  const [diffculty, setDiffculty] = useState("");

  const changeCategory = (event: any) => {
    setCategory(event.label);
    categorySelect = event.value;
  };

  const changeDiffculty = (event: any) => {
    setDiffculty(event.label);
    diffucultySelect = event.value;
  };

  const startTrivia = async () => {
    if (category === "") {
      alert("Please select a category!");
      return;
    }

    if (diffculty === "") {
      alert("Please choose diffculty");
      return;
    }

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
        {loading && <p>Loading Questions...</p>}

        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <Select
              name="trivia_category"
              className="form-control"
              placeholder="Choose Category"
              onChange={changeCategory}
              options={options}
              required
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

        {userAnswers.length === 10 && (
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

        {userAnswers.length !== 10 && !gameOver ? (
          <div>
            <p className="score">
              Category: {category}
              <br />
              Your Score: {(score / 10) * 100}%
            </p>
          </div>
        ) : null}

        {!loading && !gameOver && userAnswers.length !== 10 && (
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
        userAnswers.length !== 10 &&
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
