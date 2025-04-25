import React from 'react';

function generateBingoCard() {
    const ranges = [
        [1,15],
        [16,30],
        [31,45],
        [46,60],
        [61,75],
    ];

    const card = [];

    for (let col = 0; col < 5; col++) {
        const [min, max] = ranges[col];
        const nums = new Set();

        while (nums.size < 5) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        card.push(Array.from(nums));
    }

    const grid = [];
    for (let row = 0; row < 5; row++) {
        grid.push(card.map(col => col[row]));
    }

    grid[2][2] = 'FREE';

    return grid;
}

function BingoBoard() {
    const card = generateBingoCard();
    const columnLabels = ['B','I','N','G','O'];

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
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
                {card.flat().map((number, index) => (
                    <div
                        key={index}
                        style={{
                            border: '2px solid black',
                            backgroundColor: '#f0f0f0',
                            padding: '20px',
                            textAlign: 'center',
                            fontSize: number === 'FREE' ? '18px' : '22px',
                            fontStyle: number === 'FREE' ? 'italic' : 'normal'

                        }}
                    >
                        {number}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BingoBoard;