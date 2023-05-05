import { useEffect, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  // const [grid, setGrid] = useState(new Array(12*12).fill('.'));
  const [grid, setGrid] = useState(new Array(12).fill('.').map(() => new Array(12).fill('.')));
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
      // gridCopy[(12*posX) + posY] = 'X';
      gridCopy[posX][posY] = 'X';
    }

    // gridCopy[(12*startPos.x + startPos.y)] = 'S';
    // gridCopy[(12*goalPos.x + goalPos.y)] = 'F';
    gridCopy[startPos.x][startPos.y] = 'S';
    gridCopy[goalPos.x][goalPos.y] = 'F';

    setGrid(gridCopy);
  };

  function minimumMoves(
    grid: string[][], 
    startX: number, 
    startY: number, 
    goalX: number, 
    goalY: number
  ) {
    // const n = grid.length;
    const n = 12;
    const visited = new Array(n).fill(false).map(() => new Array(n).fill(false));
    type Point = [number, number, number];
    const queue: Point[] = [[startX, startY, 0]];
    visited[startX][startY] = true;
    
    const isBlocked = (x: number, y: number) => grid[x][y] === 'X';
    const isInsideGrid = (x: number, y:number) => x >= 0 && x < n && y >= 0 && y < n;
    
    const dx = [0, 0, 1, -1]; // possible moves in row direction
    const dy = [1, -1, 0, 0]; // possible moves in column direction
    
    while (queue.length) {
      const [x, y, dist] = queue.shift() as Point;
      if (x === goalX && y === goalY) {
        console.log("VISITED", visited);
        console.log("GRID", grid);
        return dist;
      }
      for (let k = 0; k < 4; k++) {
          let nx = x + dx[k];
          let ny = y + dy[k];
          while (isInsideGrid(nx, ny) && !isBlocked(nx, ny)) {
              if (!visited[nx][ny]) {
                  queue.push([nx, ny, dist + 1]);
                  visited[nx][ny] = true;
              }
              nx += dx[k];
              ny += dy[k];
          }
      }
    }
    console.log("VISITED", visited);
    console.log("GRID", grid);
    return -1; // unreachable goal
}

  const startProcessing = () => {
    const result:number = minimumMoves(grid, startPos.x, startPos.y, goalPos.x, goalPos.y);
    console.log("$$$$$$$$$$$$RESULT", result);
  };

  useEffect(() =>{
    initializeGrid();
  },[]);

  return (
    <div className="App">
      <button 
        className='start-button'
        onClick={startProcessing}
      >
        Start
      </button>
      <Board
        grid={grid} 
      />        
    </div>
  )
}

export default App
