import React from 'react';
import { modalStyles } from '../styles/slotMachine.styles';

export default function CashoutModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.card}>
        <h2 style={modalStyles.title}>🎉 Cashed Out Successfully!</h2>
        
        <p style={modalStyles.text}>
          <strong>Credits Migrated:</strong> {data.amountMoved}
        </p>
        
        <p style={modalStyles.text}>
          <strong>Account Total:</strong> {data.accountTotal}
        </p>
        
        <button 
          onClick={onClose} 
          style={modalStyles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1b5e20'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2e7d32'}
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}