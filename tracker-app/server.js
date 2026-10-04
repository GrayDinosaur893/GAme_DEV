import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.get('/run-game', (req, res) => {
  const exePath = req.query.path || 'raylib_intro.exe';
  const gamePath = path.join(__dirname, '..', exePath);
  const gameDir = path.dirname(gamePath);
  
  exec(`start "" "${gamePath}"`, { cwd: gameDir }, (error) => {
    if (error) {
      console.error(`Error launching game: ${error}`);
      return res.status(500).json({ success: false, error: error.message });
    }
    res.json({ success: true, message: 'Game Launched Successfully!' });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend Game Launcher running on http://localhost:${PORT}`);
});
