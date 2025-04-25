import React from 'react';
import '../App.css';

function Tile({ tile, rerollTile }) {
  const tileClass = `bingo-tile ${tile.value === 'FREE' ? 'free' : ''} ${tile.rerolled ? 'rerolled' : ''}`;

  const handleRightClick = (rc) => {
    rc.preventDefault();
    if (!tile.rerolled && !tile.isFree) {
      rerollTile(tile);
    }
  };

  return (
    <div className={tileClass} onContextMenu={handleRightClick}>
      {tile.value}
    </div>
  );
}

export default Tile;