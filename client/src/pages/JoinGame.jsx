import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function JoinGame() {
  const [gameCode, setGameCode] = useState(''); // State for the game code input
  const [gameListItems, setGameListItems] = useState([]); // State for the list of game IDs
  const [showGameList, setShowGameList] = useState(false); // State to toggle game list visibility
  const navigate = useNavigate();

  const fetchGameList = () => {
    if (showGameList) {
      setShowGameList(false); // Hide the game list
    } else {
      axios
        .get('http://localhost:8080/routes/game')
        .then((response) => {
          const gameIds = response.data;
          setGameListItems(
            gameIds.map((gameId) => <li key={gameId}>{gameId}</li>)
          );
          setShowGameList(true); // Show the game list
        })
        .catch((error) => {
          console.error('Error fetching game list:', error);
        });
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (gameCode.trim() !== '') {
        navigate(`/play/${gameCode}`); // Navigate to the game page
    } else {
      console.error('Invalid game code');
    }
  };

  const listEnterGame = (e) => {
    const selectedGameCode = e.target.innerText; // Get the selected game code from the list
    setGameCode(selectedGameCode); // Set the game code state
    setShowGameList(false); // Hide the game list
  }

  return (
    <div className="page">
      <h2>Welcome to the game lobby.. 🎮</h2>
      <form onSubmit={handleJoin} className="form">
        <input
          type="text"
          placeholder="Enter Game Code"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)} // Update gameCode state
          className="input"
        />
        <button type="submit">Join Game</button>
        <button type="button" onClick={fetchGameList}>Browse Games</button>
      </form>
      <div className="game-list">
        {showGameList && <ul onClick={listEnterGame}>{gameListItems}</ul>} {/* Render game list if visible */}
      </div>
    </div>
  );
}