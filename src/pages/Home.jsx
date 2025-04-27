import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome Hot Shot! 😎</h1>
      <div className="buttons">
        <Link to="/create">
          <button>Create Game</button>
        </Link>
        <Link to="/join">
          <button>Join Game</button>
        </Link>
      </div>
    </div>
  );
}