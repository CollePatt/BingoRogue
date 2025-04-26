import React from 'react';
import '../App.css';

function Tile({ tile, hoveredBall }) {
  const isHoveredMatch = 
    hoveredBall &&
    tile.value === hoveredBall.number &&
    tile.colLabel === hoveredBall.letter;

  const tileClass = `bingo-tile 
    ${tile.value === 'FREE' ? 'free' : ''} 
    ${tile.selected ? 'selected-tile' : ''}
    ${isHoveredMatch ? 'hovered-match' : ''}
    `;

  return (
    <div className={tileClass}>
      {tile.value}
    </div>
  );
}

export default Tile;
