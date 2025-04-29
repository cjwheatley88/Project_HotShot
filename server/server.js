import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // Import the promises version of fs for async/await

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome from the server room!');
});

// Route to get game data
app.get('/routes/game/:gameId', async (req, res) => {
  const { gameId } = req.params; // Extract gameId from the URL
  try {
    console.log('Fetching game data for:', gameId + '.json');
    // Read the JSON file corresponding to the gameId
    const data = await fs.readFile(`./data/quizzes/${gameId}.json`, 'utf-8'); // Use gameId to fetch the correct file
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    res.status(500).send('Error retrieving game data');
  }
});

// Route to get all game IDs
app.get('/routes/game', async (req, res) => {
  try {
    // Read the directory containing the game files
    const files = await fs.readdir('./data/quizzes');
    // Filter for JSON files and extract their names without the extension
    const gameIds = files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''));
    res.json(gameIds);
  } catch (error) {
    console.error('Error reading directory:', error);
    res.status(500).send('Error retrieving game IDs');
  }
});