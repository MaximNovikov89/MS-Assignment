export const styles = {
    container: {
      fontFamily: '"Courier New", Courier, monospace',
      maxWidth: '500px',
      margin: '4rem auto',
      padding: '2rem',
      border: '3px solid #000',
      backgroundColor: '#fff',
      boxShadow: '8px 8px 0px #000'
    },
    header: {
      textAlign: 'center',
      marginBottom: '2.5rem',
      borderBottom: '2px dashed #000',
      paddingBottom: '1rem'
    },
    title: {
      margin: 0,
      fontSize: '2.25rem',
      textTransform: 'uppercase'
    },
    subtitle: {
      margin: '0.25rem 0 0 0',
      fontSize: '0.9rem',
      color: '#666'
    },
    lobby: {
      textAlign: 'center',
      padding: '2rem 0'
    },
    gameBoard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    },
    balanceContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '2px solid #000',
      padding: '0.75rem 1rem',
      backgroundColor: '#f9f9f9'
    },
    balanceLabel: {
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    balanceValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    unit: {
      fontSize: '0.8rem',
      textTransform: 'uppercase',
      color: '#555'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    slotBlock: {
      width: '33.33%',
      border: '3px solid #000',
      backgroundColor: '#fff',
      padding: '2rem 0',
      textAlign: 'center'
    },
    symbolWrapper: {
      fontSize: '3.5rem',
      fontWeight: 'black',
      lineHeight: 1
    },
    actionControls: {
      display: 'flex',
      gap: '1rem'
    },
    primaryButton: {
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      padding: '1rem 2rem',
      border: '2px solid #000',
      backgroundColor: '#fff',
      cursor: 'pointer',
      boxShadow: '4px 4px 0px #000',
      transition: 'transform 0.1s'
    },
    leverButton: {
      flex: 2,
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      padding: '1rem',
      border: '2px solid #000',
      backgroundColor: '#fff',
      cursor: 'pointer',
      boxShadow: '4px 4px 0px #000'
    },
    cashoutButton: {
      flex: 1,
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      padding: '1rem',
      border: '2px solid #000',
      backgroundColor: '#ffdbdb',
      cursor: 'pointer',
      boxShadow: '4px 4px 0px #000'
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
      boxShadow: 'none',
      transform: 'translate(4px, 4px)'
    }
  };