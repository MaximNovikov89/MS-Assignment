const GAME_CONFIG = {
    SYMBOLS: ['C', 'L', 'O', 'W'],
    REWARDS: {
      'C': 10,
      'L': 20,
      'O': 30,
      'W': 40
    },
    COST_PER_ROLL: 1,
    STARTING_CREDITS: 10,
    THRESHOLDS: {
      LOW_CHEAT: 40,
      HIGH_CHEAT: 60
    },
    CHANCES: {
      LOW_CHEAT_CHANCE: 0.30,  // 30% chance to re-roll
      HIGH_CHEAT_CHANCE: 0.60  // 60% chance to re-roll
    }
  };
  
  // Freeze the configuration object recursively to make it completely immutable
  Object.freeze(GAME_CONFIG);
  Object.freeze(GAME_CONFIG.SYMBOLS);
  Object.freeze(GAME_CONFIG.REWARDS);
  Object.freeze(GAME_CONFIG.THRESHOLDS);
  Object.freeze(GAME_CONFIG.CHANCES);
  
  export default GAME_CONFIG;