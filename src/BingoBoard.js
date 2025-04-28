import React, { useState, useEffect } from 'react';
import Tile from './Components/Tile-Test';

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
      value: num,
      row,
      col,
      colLabel: 'BINGO'[col],
      rerolled: false,
      selected: false,
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

// Helper to create full 75-ball pool
function initializeBallPool() {
  const ballPool = [];
  const columns = ['B', 'I', 'N', 'G', 'O'];
  for (let i = 0; i < 5; i++) {
    const min = 1 + i * 15;
    const max = 15 + i * 15;
    for (let num = min; num <= max; num++) {
      ballPool.push({
        letter: columns[i],
        number: num,
        id: `${columns[i]}-${num}`,
      });
    }
  }
  return ballPool;
}

function BingoBoard() {
  const [card, setCard] = useState(generateBingoCard());
  const [ballPool, setBallPool] = useState(initializeBallPool());
  const [currentBalls, setCurrentBalls] = useState([]);
  const [rerollsLeft, setRerollsLeft] = useState(8);
  const [selectsLeft, setSelectsLeft] = useState(10);

  // Draw 3 balls on start
  useEffect(() => {
    drawBalls(3);
  }, []);

  // Draw N balls from ballPool
  function drawBalls(count) {
    if (ballPool.length < count) return; // Not enough balls left
    const poolCopy = [...ballPool];
    const drawnBalls = [];

    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * poolCopy.length);
      drawnBalls.push(poolCopy[idx]);
      poolCopy.splice(idx, 1); // remove from copy
    }

    setCurrentBalls(drawnBalls);
  }

  // Reroll all 3 balls
  function rerollAllBalls() {
    if (rerollsLeft < 1) return;
    drawBalls(3);
    setRerollsLeft(r => r - 1);
  }

  // Reroll a single ball
  function rerollSingleBall(index) {
    if (rerollsLeft < 2) return;
    if (ballPool.length < 1) return;

    const poolCopy = [...ballPool];
    const idx = Math.floor(Math.random() * poolCopy.length);
    const newBall = poolCopy[idx];

    const newCurrent = [...currentBalls];
    newCurrent[index] = newBall;

    setCurrentBalls(newCurrent);
    setRerollsLeft(r => r - 2);
  }

  // Selecting a ball to mark on the board
  function selectBall(ball) {
    if (selectsLeft <= 0) return;

    const updatedCard = card.map(row =>
      row.map(tile => {
        if (tile.value === ball.number && tile.colLabel === ball.letter) {
          return { ...tile, selected: true };
        }
        return tile;
      })
    );

    // Remove selected ball from pool
    const newPool = ballPool.filter(b => b.id !== ball.id);

    // Remove ball from currentBalls
    const newCurrentBalls = currentBalls.filter(b => b.id !== ball.id);

    setCard(updatedCard);
    setBallPool(newPool);
    setCurrentBalls(newCurrentBalls);
    setSelectsLeft(s => s - 1);
  }

  const columnLabels = ['B', 'I', 'N', 'G', 'O'];

  const [hoveredBall, setHoveredBall] = useState(null);

  function Marquee() {

    // 
    return (
      <div className="marquee">
        {columnLabels.map((letter, colIndex) => (
        <>
          <div className="marquee-ball letter">{letter}</div>
          {
          Array.from({ length: 15 }, (_, rowIndex) => {

            const number = colIndex * 15 + rowIndex + 1;
            const ballInPool = ballPool.find(ball => ball.number === number && ball.letter === letter);

            return (
              <div 
                key={`${letter}-${number}`}
                className={`marquee-ball ${ballInPool ? ' ' : 'drawn'}`}>
                  {number}
              </div>
              );
          })}
        </>
        ))}
      </div>
    );
  }

  return (
    <div className="bingo-container">
      {/* Display current balls */}
      <div className="ball-area">
        <div className="ball-display">
          {currentBalls.map((ball, index) => (
            <div
              key={ball.id}
              className="ball"
              onClick={() => selectBall(ball)}
              onContextMenu={(e) => {
                e.preventDefault();
                rerollSingleBall(index);
              }}
              onMouseEnter={() => setHoveredBall(ball)}
              onMouseLeave={() => setHoveredBall(null)}
            >
              {ball.letter}-{ball.number}
            </div>
          ))}
        </div>

        <div className="resources">
          <p>Rerolls Left: {rerollsLeft}</p>
          <p>Selects Left: {selectsLeft}</p>
          <button onClick={rerollAllBalls}>Reroll All</button>
        </div>
      </div>

      {/* Bingo Header */}
      <div className="bingo-header">
        {columnLabels.map((letter, index) => (
          <div key={index} className="bingo-header-cell">
            {letter}
          </div>
        ))}
      </div>

      {/* Bingo Tiles */}
      <div className="bingo-grid">
        {card.flat().map((tile, index) => (
          <Tile key={index} tile={tile}  hoveredBall={hoveredBall} />
        ))}
      </div>

      {Marquee()}
      <p className="marquee-text">Balls left in the pool</p>
    </div>

    
  );
}

export default BingoBoard;
