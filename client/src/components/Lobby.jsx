import { styles } from '../styles/slotMachine.styles';

export default function Lobby({ onStartSession, isPending }) {
  return (
    <div style={styles.lobby}>
      <button 
        style={styles.primaryButton}
        disabled={isPending}
        onClick={onStartSession}
      >
        {isPending ? 'Allocating Credits...' : 'Start New Session (10 Credits)'}
      </button>
    </div>
  );
}