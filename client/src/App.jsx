import { useState, useEffect, useTransition } from 'react';
import { useMutation } from '@tanstack/react-query';

import Lobby from './components/Lobby';
import GameBoard from './components/GameBoard';
import * as GAME_CONFIG from '@shared/constants.js';
const { SYMBOLS } = GAME_CONFIG;

import { styles } from './styles/slotMachine.styles';

const API_BASE_URL = 'http://localhost:5000/api';

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [credits, setCredits] = useState(0);
  const [displaySymbols, setDisplaySymbols] = useState(['-', '-', '-']);
  const [gameState, setGameState] = useState('IDLE');

  const [isPending, startTransition] = useTransition();

  const startSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/session`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to open casino session.');
      return response.json();
    },
    onSuccess: (data) => {
      startTransition(() => {
        setSessionId(data.sessionId);
        setCredits(data.credits);
        setDisplaySymbols(['-', '-', '-']);
        setGameState('IDLE');
      });
    },
    onError: (err) => alert(err.message)
  });

  const rollMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/roll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server transaction rejected.');
      }
      return response.json();
    },
    onMutate: () => {
      setGameState('SPINNING');
      setDisplaySymbols(['X', 'X', 'X']);
    },
    onSuccess: (data) => {
      setGameState('REVEALING');

      setTimeout(() => {
        setDisplaySymbols(prev => [data.roll[0], prev[1], prev[2]]);
      }, 1000);

      setTimeout(() => {
        setDisplaySymbols(prev => [prev[0], data.roll[1], prev[2]]);
      }, 2000);

      setTimeout(() => {
        setDisplaySymbols(prev => [prev[0], prev[1], data.roll[2]]);
        setCredits(data.currentCredits);
        setGameState('IDLE');
      }, 3000);
    },
    onError: (err) => {
      alert(err.message);
      setGameState('IDLE');
      setDisplaySymbols(['ERR', 'ERR', 'ERR']);
    }
  });

  const cashoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/cashout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      if (!response.ok) throw new Error('Cashout processing rejected.');
      return response.json();
    },
    onSuccess: (data) => {
      // 1. Notify the user of their safe transaction metrics first
      alert(`🎉 Cashed out successfully!\nCredits Migrated: ${data.amountMoved}\nAccount Total: ${data.accountTotal}`);
      
      // 2. AUTOMATIC REFRESH: Instantly spin up a brand new backend session
      startSessionMutation.mutate();
    },
    onError: (err) => alert(err.message)
  });

  useEffect(() => {
    let animationInterval;
    if (gameState === 'SPINNING') {
      animationInterval = setInterval(() => {
        setDisplaySymbols([
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
        ]);
      }, 70); 
    }
    return () => clearInterval(animationInterval);
  }, [gameState]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Las Vegas 2020</h1>
        <p style={styles.subtitle}>Online Slot Machine Simulator</p>
      </header>

      {!sessionId ? (
        <Lobby 
          onStartSession={() => startSessionMutation.mutate()} 
          isPending={startSessionMutation.isPending || isPending} 
        />
      ) : (
        <GameBoard
          credits={credits}
          displaySymbols={displaySymbols}
          gameState={gameState}
          onRoll={() => rollMutation.mutate()}
          onCashout={() => cashoutMutation.mutate()}
        />
      )}
    </div>
  );
}