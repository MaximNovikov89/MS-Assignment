import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

import { executeRoll } from '../GameMechanics/gameMechanics.js';
import GAME_CONFIG from '../GameMechanics/constants.js';
import sessionRepo from './sessionRepository.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

app.post('/api/session', (req, res) => {
  const sessionId = uuidv4();
  
  sessionRepo.createSession(sessionId, GAME_CONFIG.STARTING_CREDITS);

  res.status(201).json({
    sessionId,
    credits: GAME_CONFIG.STARTING_CREDITS
  });
});

app.post('/api/roll', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId token parameter.' });
  }

  const session = sessionRepo.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  if (session.status === 'closed') {
    return res.status(403).json({ error: 'This session has been closed. Please start a new game.' });
  }

  if (session.credits < GAME_CONFIG.COST_PER_ROLL) {
    return res.status(400).json({ error: 'Insufficient credits to perform a roll.' });
  }

  let currentCredits = session.credits - GAME_CONFIG.COST_PER_ROLL;
  const result = executeRoll(currentCredits);

  let finalCredits = currentCredits + (result.win ? result.reward : 0);
  sessionRepo.updateSessionCredits(sessionId, finalCredits);

  res.json({
    roll: result.roll,
    win: result.win,
    reward: result.reward,
    currentCredits: finalCredits
  });
});

app.post('/api/cashout', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId token parameter.' });
  }

  const session = sessionRepo.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found.' });
  }

  if (session.status === 'closed') {
    return res.status(400).json({ error: 'This session has already been cashed out and closed.' });
  }

  const cashoutDetails = sessionRepo.cashoutSession(sessionId);
  if (!cashoutDetails) {
    return res.status(500).json({ error: 'Failed to process cashout.' });
  }

  res.json({
    message: 'Cashed out successfully!',
    amountMoved: cashoutDetails.amountMoved,
    accountTotal: cashoutDetails.accountTotal
  });
});

app.listen(PORT, () => {
  console.log(`[Casino Server Active] Hosted on http://localhost:${PORT}`);
});