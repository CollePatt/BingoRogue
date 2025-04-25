import React, { useState } from 'react';
import Tile from './Components/tile';

function generateBingoCard() {
  const ranges = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  const columns = [];

  for (let col = 0; col < 5; col++) {
    const [min, max] = ranges[col];
    const nums = new Set();

    while (nums.size < 5) {
      nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    const column = Array.from(nums).map((num, row) => ({
      value: num, row, col,
      colLabel: 'BINGO'[col],
      rerolled: false,
    }));

    columns.push(column);
  }

  const grid = [];
  for (let row = 0; row < 5; row++) {
    grid.push(columns.map(col => col[row]));
  }

  grid[2][2].value = 'FREE';
  grid[2][2].isFree = true;

  return grid;
}

function BingoBoard() {
  const [card, setCard] = useState(generateBingoCard());
  const columnRanges = [
    [1, 15],
    [16, 30],
    [31, 45],
    [46, 60],
    [61, 75],
  ];

  const rerollTile = (tile) => {
    const [min, max] = columnRanges[tile.col];
    let newValue;

    do {
      newValue = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (newValue === tile.value);

    const updatedCard = card.map(row =>
      row.map(t => {
        if (t === tile) {
          return { ...t, value: newValue, rerolled: true };
        }
        return t;
      })
    );

    setCard(updatedCard);
  };

  const columnLabels = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="bingo-container">
      <div className="bingo-header">
        {columnLabels.map((letter, index) => (
          <div key={index} className="bingo-header-cell">
            {letter}
          </div>
        ))}
      </div>

      <div className="bingo-grid">
        {card.flat().map((tile, index) => (
          <Tile key={index} tile={tile} rerollTile={rerollTile} />
        ))}
      </div>
    </div>
  );
}

export default BingoBoard;
