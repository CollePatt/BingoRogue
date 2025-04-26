import React from 'react';
import '../App.css';

function Tile({ tile }) {
  const tileClass = `bingo-tile 
    ${tile.value === 'FREE' ? 'free' : ''} 
    ${tile.selected ? 'selected-tile' : ''}`;

  return (
    <div className={tileClass}>
      {tile.value}
    </div>
  );
}

export default Tile;
