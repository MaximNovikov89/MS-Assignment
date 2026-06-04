import GAME_CONFIG from './constants.js';

const { SYMBOLS, THRESHOLDS, CHANCES, REWARDS } = GAME_CONFIG;

function generateRandomRoll() {
    return [
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
    ];
  }

  function isWinningRoll(roll) {
    return roll[0] === roll[1] && roll[1] === roll[2];
  }

  function executeRoll(currentCredits) {
    let roll = generateRandomRoll();
    let win = isWinningRoll(roll);
  
    // If the initial roll is a loss, the house doesn't need to cheat. Return immediately.
    if (!win) {
      return { roll, win, reward: 0 };
    }
  
    // Destructure thresholds and chances for cleaner inline math evaluation
    const { LOW_CHEAT: lowThreshold, HIGH_CHEAT: highThreshold } = THRESHOLDS;
    const { LOW_CHEAT_CHANCE: lowChance, HIGH_CHEAT_CHANCE: highChance } = CHANCES;
  
    // Determine the house's intervention probability based on the user's current credit brackets
    let cheatChance = 0;
    if (currentCredits >= lowThreshold && currentCredits <= highThreshold) {
      cheatChance = lowChance; 
    } else if (currentCredits > highThreshold) {
      cheatChance = highChance;
    }
  
    // Determine if the house decides to roll again to turn a win into a potential loss
    if (cheatChance > 0 && Math.random() < cheatChance) {
      roll = generateRandomRoll();
      win = isWinningRoll(roll); // Re-evaluate if the new roll is a win
    }
  
    // Calculate rewards if they managed to keep the win
    const reward = win ? REWARDS[roll[0]] : 0;
  
    return {
      roll,
      win,
      reward
    };
  }
  
  export {
    executeRoll,
    isWinningRoll,
    generateRandomRoll
  };
