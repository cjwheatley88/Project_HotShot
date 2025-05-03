import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JoinGame from './pages/JoinGame';
import PlayGame from './pages/PlayGame';
//import CreateGame from './pages/CreateGame';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/play/:gameId" element={<PlayGame />} />
        {/*<Route path="/create" element={<CreateGame />} />*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;