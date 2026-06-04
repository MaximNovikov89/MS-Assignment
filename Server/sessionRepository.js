import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DATA_FILE = path.join(__dirname, 'sessions.json');

let sessions = new Map();
let userAccounts = { globalBalance: 0 };

function saveStateToDisk() {
  try {
    const dataToSave = {
      sessions: Array.from(sessions.entries()), // Serialize Map into standard JSON array formats
      userAccounts
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf8');
  } catch (error) {
    console.error('[Repository Error] Failed writing database save state:', error);
  }
}

function loadStateFromDisk() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(fileData);
      sessions = new Map(parsed.sessions);
      userAccounts = parsed.userAccounts || { globalBalance: 0 };
      console.log(`[Repository Active] Successfully restored ${sessions.size} active sessions.`);
    } catch (err) {
      console.error('[Repository Error] Failed to parse backup file, initialization defaulted to clear parameters.', err);
    }
  }
}

loadStateFromDisk();

export default {
  createSession: (sessionId, startingCredits) => {
    sessions.set(sessionId, {
      credits: startingCredits,
      createdAt: new Date()
    });
    saveStateToDisk();
  },

  getSession: (sessionId) => {
    return sessions.get(sessionId);
  },

  updateSessionCredits: (sessionId, newCredits) => {
    const session = sessions.get(sessionId);
    if (session) {
      session.credits = newCredits;
      saveStateToDisk();
    }
  },

  cashoutSession: (sessionId) => {
    const session = sessions.get(sessionId);
    if (!session) return null;

    const finalCredits = session.credits;
    userAccounts.globalBalance += finalCredits;
    sessions.delete(sessionId);
    saveStateToDisk();

    return {
      amountMoved: finalCredits,
      accountTotal: userAccounts.globalBalance
    };
  }
};