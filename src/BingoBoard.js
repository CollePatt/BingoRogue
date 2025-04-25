import React, { useState } from 'react';
import Tile from './components/Tile';

function BingoBoard() {
    // state
    const [card, setCard] = useState(() => generateBingoCard());
    const [rerollCount, setRerollCount] = useState(0);
    
    // labels for columns
    const columnLabels = ['B','I','N','G','O'];

   

    function generateBingoCard() {
        
        const ranges = [
            [1,15],
            [16,30],
            [31,45],
            [46,60],
            [61,75],
        ];

        let newCard = [];
    
        for (let col = 0; col < 5; col++) {
            const [min, max] = ranges[col];
            const nums = new Set();
    
            while (nums.size < 5) {
                nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
            }
    
            newCard.push(Array.from(nums));
        }
    
        let grid = [];
        for (let row = 0; row < 5; row++) {
            grid.push(newCard.map(col => col[row]));
        }
    
        grid[2][2] = 'FREE';
    
        return grid;
    }
    
    function handleClick(event) {
        const target = event.target;
        if (target.style.backgroundColor === 'green') {
            target.style.backgroundColor = '#f0f0f0';
            target.style.color = 'black';
        } else {
            target.style.backgroundColor = 'green';
            target.style.color = 'white';
        }
    }
    
    // change right click to randomize the tile value and update the state values
    // and prevent the default context menu from appearing
    function handleRightClick(event, index) {
    
        const ranges = [
            [1,15],
            [16,30],
            [31,45],
            [46,60],
            [61,75],
        ];

        event.preventDefault();
        const target = event.target;
        if (target.style.backgroundColor === 'green') {
            target.style.backgroundColor = '#f0f0f0';
            target.style.color = 'black';
        }
        
        console.log(index);
        
        const colIndex = Math.floor(index / 5);
        const rowIndex = index % 5;
        
        const [min, max] = ranges[rowIndex];
        const newValue = Math.floor(Math.random() * (max - min + 1)) + min;
        const newCard = [...card];
        newCard[colIndex][rowIndex] = newValue;

        setCard(newCard);
        setRerollCount(rerollCount + 1);
    }

    return (

        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '10px' }}>
                {columnLabels.map((letter, index) => (
                    <div
                        key={index}
                        style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            padding: '10px',
                            backgroundColor:'rgb(142, 147, 156)',
                            border: '1px solid #000',
                        }}
                    >
                        {letter}
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px'}}>
                
                
                {
                // flatten the card array and map over it to create tiles
                card.flat().map((number, index) => (
                    <Tile
                        key={index}
                        number={number}
                        index={index}
                        onClick={handleClick}
                        onContextMenu={e => handleRightClick(e, index)}
                        freeSpace={number === 'FREE'}
                    />
                    
                ))}
            </div>

            <p>Reroll Count: {rerollCount}</p>
        </>
    );
}

export default BingoBoard;