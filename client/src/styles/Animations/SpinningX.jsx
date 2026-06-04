const SpinningX = () => {
    return (
      <span style={{ 
        display: 'inline-block',
        animation: 'minimalistXSpin 0.55s linear infinite'
      }}>
        <style>{`
          @keyframes minimalistXSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        X
      </span>
    );
  };
  
  export default SpinningX;