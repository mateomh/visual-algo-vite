import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  const [grid, setGrid] = useState(new Array(12*12).fill('.'));
  const [startPos, setStartPos] = useState({
    x: Math.round(Math.random() * 11),
    y: Math.round(Math.random() * 11)
  });
  const [goalPos, setGoalPos] = useState({
    x: Math.round(Math.random() * 11),
    y: Math.round(Math.random() * 11)
  });

  const initializeGrid = () => {
    const gridCopy = [...grid];
    for(let i=0; i< 10; i++){
      const posX = Math.round(Math.random() * 11);
      const posY = Math.round(Math.random() * 11);
      gridCopy[(12*posX) + posY] = 'X';
    }

    gridCopy[(12*startPos.x + startPos.y)] = 'S';
    gridCopy[(12*goalPos.x + goalPos.y)] = 'F';    

    setGrid(gridCopy);
  };

  useEffect(() =>{
    initializeGrid();
  },[]);

  return (
    <div className="App">
      <Board
        grid={grid} 
      />        
    </div>
  )
}

export default App
