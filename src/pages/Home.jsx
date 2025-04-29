// Import the Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';

// Home component - the main landing page
export default function Home() {
  return (
    <div className="page">
      <h1>Pop Quiz Hot Shot! 😎</h1>
      <div className="buttons">
        {/* Link to the Create Game page */}
        <Link to="/create">
          <button>Create Game</button>
        </Link>
        {/* Link to the Join Game page */}
        <Link to="/join">
          <button>Join Game</button>
        </Link>
      </div>
    </div>
  );
}