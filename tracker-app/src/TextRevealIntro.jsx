import React, { useState, useEffect } from 'react';

const TextRevealIntro = ({ onComplete }) => {
  const targetText = "100 DAYS OF C++ X GAME DEV";
  // The layout in the video is a block of text. We can simulate it with multiple lines.
  const lines = [
    "RTYUIOPDFJHLKWEWQE",
    "FUOAIGYLRYSBJLPISAST",
    "YEVGENIYAERTGRABRQ", // This line will hold the target text or we just randomize everything
    "RTIOBNMSDUAPYEGJRA",
    "FPOIMEUFOYDBZUALHD"
  ];

  const [phase, setPhase] = useState('scramble'); // scramble, reveal, fadeout
  
  // We'll generate a grid of characters
  // Let's create a 5x25 grid
  const rows = 5;
  const cols = 26;
  
  // Target string placement: Row 2, centered
  const targetRow = 2;
  const startCol = Math.floor((cols - targetText.length) / 2);
  
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const initialGrid = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        let isTarget = false;
        let char = letters[Math.floor(Math.random() * letters.length)];
        
        if (r === targetRow && c >= startCol && c < startCol + targetText.length) {
          char = targetText[c - startCol];
          if (char !== ' ') {
            isTarget = true;
          }
        }
        
        row.push({
          id: `${r}-${c}`,
          char: char,
          isTarget: isTarget,
          opacity: 1
        });
      }
      initialGrid.push(row);
    }
    setGrid(initialGrid);

    // After 1 second, fade out non-target
    const revealTimer = setTimeout(() => {
      setPhase('reveal');
      setGrid(prev => prev.map(row => row.map(cell => ({
        ...cell,
        opacity: cell.isTarget ? 1 : 0
      }))));
    }, 1500);

    // After 3.5 seconds, fade out entire screen
    const finishTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 3500);

    // After 4.5 seconds, remove from DOM
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(finishTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100vh',
      backgroundColor: '#F9F8F6', // Creamy white from the video
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: phase === 'fadeout' ? 0 : 1,
      transition: 'opacity 1s ease-in-out',
      pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      fontFamily: '"Times New Roman", Times, serif'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {grid.map((row, rIdx) => (
          <div key={rIdx} style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {row.map((cell) => (
              <span key={cell.id} style={{
                color: '#333',
                fontSize: '2rem',
                opacity: cell.opacity,
                transition: 'opacity 1.5s ease-in-out',
                width: '32px',
                textAlign: 'center'
              }}>
                {cell.char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextRevealIntro;
