// server/server.js

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const { executeRoll } = require('../GameMechanics/gameMechanics');
const GAME_CONFIG = require('../GameMechanics/constants');
const sessionRepo = require('./sessionRepository');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(express.json());

/**
 * Task: Session initialization
 */
app.post('/api/session', (req, res) => {
  const sessionId = uuidv4();
  
  sessionRepo.createSession(sessionId, GAME_CONFIG.STARTING_CREDITS);

  res.status(201).json({
    sessionId,
    credits: GAME_CONFIG.STARTING_CREDITS
  });
});

/**
 * Task: Main Roll Controller
 */
app.post('/api/roll', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId token parameter.' });
  }

  const session = sessionRepo.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ error: 'Session not found or has been closed.' });
  }

  if (session.credits < GAME_CONFIG.COST_PER_ROLL) {
    return res.status(400).json({ error: 'Insufficient credits to perform a roll.' });
  }

  // Deduct token cost and execute core game mechanics
  let currentCredits = session.credits - GAME_CONFIG.COST_PER_ROLL;
  const result = executeRoll(currentCredits);

  // Calculate final wallet outcomes
  let finalCredits = currentCredits + (result.win ? result.reward : 0);
  sessionRepo.updateSessionCredits(sessionId, finalCredits);

  res.json({
    roll: result.roll,
    win: result.win,
    reward: result.reward,
    currentCredits: finalCredits
  });
});

/**
 * Task: Cash-out Mechanism
 */
app.post('/api/cashout', (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing sessionId token parameter.' });
  }

  const cashoutDetails = sessionRepo.cashoutSession(sessionId);
  if (!cashoutDetails) {
    return res.status(404).json({ error: 'No active session found matching this token.' });
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