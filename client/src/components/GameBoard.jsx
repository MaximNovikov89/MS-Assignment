import SlotTable from './SlotTable';
import { styles } from '../styles/slotMachine.styles';

const GameBoard = ({ 
  credits, 
  displaySymbols, 
  gameState, 
  onRoll, 
  onCashout 
}) => {
  const isLeverDisabled = gameState !== 'IDLE' || credits < 1;
  const isCashoutDisabled = gameState !== 'IDLE';

  return (
    <main style={styles.gameBoard}>
      <div style={styles.balanceContainer}>
        <span style={styles.balanceLabel}>Session Balance</span>
        <span style={styles.balanceValue}>
          {credits} <small style={styles.unit}>credits</small>
        </span>
      </div>

      <SlotTable displaySymbols={displaySymbols} />

      <div style={styles.actionControls}>
        <button
          style={{
            ...styles.leverButton,
            ...(isLeverDisabled ? styles.disabledButton : {})
          }}
          disabled={isLeverDisabled}
          onClick={onRoll}
        >
          {gameState === 'SPINNING' 
            ? 'Spinning...' 
            : gameState === 'REVEALING' 
              ? 'Stopping...' 
              : 'Pull Lever (1 Credit)'}
        </button>

        <button
          style={{
            ...styles.cashoutButton,
            ...(isCashoutDisabled ? styles.disabledButton : {})
          }}
          disabled={isCashoutDisabled}
          onClick={onCashout}
        >
          Cash Out
        </button>
      </div>
    </main>
  );
};

export default GameBoard;