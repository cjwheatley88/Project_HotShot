import { useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import { db } from '../services/firebase';  <-- (if you want to load real questions later)

export default function PlayGame() {
  const { gameId } = useParams();
  const location = useLocation();
  const { userName } = location.state || {};

  // TEMP: Example questions
  const sampleQuestions = [
    {
      question: "What is Taylor Swift's middle name?",
      options: ["Alison", "Marie", "Elizabeth", "Anne"],
      answer: "Alison",
    },
    {
      question: "Which album features the song 'Love Story'?",
      options: ["Fearless", "Red", "1989", "Speak Now"],
      answer: "Fearless",
    },
    {
      question: "What year did Taylor Swift release her debut album?",
      options: ["2004", "2006", "2008", "2010"],
      answer: "2006",
    },
    {
      question: "Which song features the lyrics 'Cause you were Romeo, you were throwing pebbles'?",
      options: ["Love Story", "You Belong with Me", "Teardrops on My Guitar", "Fifteen"],
      answer: "Love Story",
    },
    {
      question: "What is the name of Taylor Swift's cat?",
      options: ["Olivia", "Meredith", "Benjamin", "Diana"],
      answer: "Olivia",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < sampleQuestions.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption('');
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="page">
        <h2>🎉 Game Over!</h2>
        <p>Your Score: {score} / {sampleQuestions.length}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Game Code: { gameId }</h2>
      <h2>Player: { userName }</h2>
      <h3>Question {currentQuestionIndex + 1} / {sampleQuestions.length}</h3>
      <p className="question">{currentQuestion.question}</p>
      <div className="options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === option ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== ''}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}