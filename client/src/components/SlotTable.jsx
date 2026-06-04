import { styles } from '../styles/slotMachine.styles';

export default function SlotTable({ displaySymbols }) {
  return (
    <table style={styles.table}>
      <tbody>
        <tr>
          {displaySymbols.map((symbol, index) => (
            <td key={index} style={styles.slotBlock}>
              <div style={styles.symbolWrapper}>
                {symbol}
              </div>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}