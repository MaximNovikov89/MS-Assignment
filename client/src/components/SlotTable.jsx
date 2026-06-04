import SpinningX from '../styles/Animations/SpinningX';
import { styles } from '../styles/slotMachine.styles';

const SlotTable = ({ displaySymbols }) => {
  return (
    <table style={styles.table}>
      <tbody>
        <tr>
          {displaySymbols.map((symbol, index) => (
            <td key={index} style={styles.slotBlock}>
              <div style={styles.symbolWrapper}>
                {symbol === 'X' ? <SpinningX /> : symbol}
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default SlotTable;