import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Requires a means to searhch for a game code
// and join the game if it exists
// This is a placeholder for the actual game joining logic

export default function JoinGame() {
  const [gameCode, setGameCode] = useState('');
  // eslint-disable-next-line
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    if (gameCode.trim() !== '' && gameCode.trim() === 'test') {
      setGameCode('test');
      console.log('Joining game with code:', gameCode);
    
      //use prompt to capture user name
      const name = prompt('Enter your name:');
      if (name) {
        setUserName(name);
        console.log('User name:', name);
      } else {
        console.error('User name is required');
        return;
      }

      //navigate to the game page
      navigate(`/play/${gameCode}`, { state: { userName: name } });

    } else {
      console.error('Invalid game code:', gameCode);
      //Flash button to red briefly
    }
  };

  return (
    <div className="page">
      <h2>🎮 Join a Game</h2>
      <form onSubmit={handleJoin} className="form">
        <input
          type="text"
          placeholder="Enter Game Code"
          value={gameCode}
          onChange={(e) => setGameCode(e.target.value)}
          className="input"
        />
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
}