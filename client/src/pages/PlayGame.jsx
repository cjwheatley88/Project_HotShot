import { useParams, useNavigate } from 'react-router-dom'; // Import necessary hooks from react-router-dom
import { useEffect, useState, useCallback } from 'react'; 
import axios from 'axios'; // Import axios for making HTTP requests

export default function PlayGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [sampleQuestions, setSampleQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [choices, setChoices] = useState([]); // State to store user's choice

  const goHome = () => {
    navigate('/'); // Navigate to the home page
  }
  // Fetch questions from the API
  const apiCall = useCallback(() => {
    axios
      .get(`http://localhost:8080/routes/game/${gameId}`)
      .then((response) => {
        setSampleQuestions(response.data); // Update state with the fetched questions
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
      });
  }, [gameId]);

  useEffect(() => {
    apiCall();
  }, [apiCall]);

  // Ensure currentQuestion is valid
  const currentQuestion =
    sampleQuestions.length > 0 && currentQuestionIndex < sampleQuestions.length
      ? sampleQuestions[currentQuestionIndex]
      : null;

  if (!currentQuestion) {
    return <div>Loading questions...</div>; // Show a loading message if questions are not ready
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    } 
    setChoices( // Replace the state
      [ // with a new array
        ...choices, // that contains all the old items
        { option } // and one new item at the end
      ]
    );  

    setTimeout(() => {
      if (currentQuestionIndex + 1 < sampleQuestions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedOption('');
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    const playAgain = () => {
      setCurrentQuestionIndex(0);
      setSelectedOption('');
      setScore(0);
      setShowResult(false);
      setChoices([]); // Reset the wrong choices
    };
    return (
      <div className="page">
        <h2>🎉 Game Over!</h2>
        <p>Your Score: {score} / {sampleQuestions.length}</p>
        <button onClick={playAgain}>Play Again?</button>
        <button className="homeButton" onClick={goHome}>Home</button>
          <h3>Results</h3>
          <ul>
            {sampleQuestions.map((question, index) => (
              <li key={index}>
                <p>Question: {question.question}</p>
                <p>Correct Answer: {question.answer}</p>
                <p>
                  {choices[index]?.option === question.answer ? (
                    <span style={{ color: 'green' }}>Your Answer: {question.answer}</span>
                  ) : (
                    <span style={{ color: 'red' }}>Your Answer: {choices[index]?.option || 'No Answer'}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
    );
  }
  return (
    <div className="page">
      <h2>Game Code: {gameId}</h2>
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
      <>        
      <button className="homeButton" onClick={goHome}>Home</button>
      </>
      {/* <div className="timer">Timer</div> */}
    </div>
  );
}