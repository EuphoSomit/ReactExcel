import React from 'react';

const OutputRenderer = data => {
  const { rows, columns } = data;
  return (
    <div>
      <table>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map(c => {
                return c.name !== 'A' && c.name !== 'B' ? (
                  <td key={c.key}>{r[c.key]}</td>
                ) : null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputRenderer;
