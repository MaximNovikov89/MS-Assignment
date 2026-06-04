import React from 'react';
import { styles } from '../styles/slotMachine.styles'; 

export default function CashoutModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalCard}>
        <h2 style={styles.modalTitle}>🎉 Payout Confirmed</h2>
        
        <p style={styles.modalText}>
          <strong>Credits Migrated:</strong> {data.amountMoved}
        </p>
        
        <p style={styles.modalText}>
          <strong>Account Total:</strong> {data.accountTotal}
        </p>
        
        <button 
          onClick={onClose} 
          style={styles.modalButton}
          onMouseOver={(e) => {
            e.target.style.transform = 'translate(2px, 2px)';
            e.target.style.boxShadow = '2px 2px 0px #000';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'none';
            e.target.style.boxShadow = '4px 4px 0px #000';
          }}
        >
          Collect & Spin Again
        </button>
      </div>
    </div>
  );
}