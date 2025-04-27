import { useParams, useNavigate } from 'react-router-dom';

export default function Results() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  // You could pass these as props or store them in a database later
  const score = 7;        // (placeholder score)
  const totalQuestions = 10; // (placeholder total)

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="page">
      <h1>🏆 Game Over!</h1>
      <h2>Game Code: {gameId}</h2>

      <div className="results-box">
        <p>Your Score:</p>
        <h1>{score} / {totalQuestions}</h1>

        <p>🔥 {Math.round((score / totalQuestions) * 100)}% Correct!</p>
      </div>

      <button onClick={handlePlayAgain} className="play-again-button">
        Play Again
      </button>
    </div>
  );
}