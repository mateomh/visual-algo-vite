import { useEffect, useRef, useState } from 'react'
import './App.css'
import Board from './components/Board'

function App() {
  // const [grid, setGrid] = useState(new Array(12*12).fill('.'));
  const [n, setN] = useState(12);
  const [grid, setGrid] = useState(new Array(n).fill('.').map(() => new Array(n).fill('.')));
  const [startPos, setStartPos] = useState({
    x: Math.round(Math.random() * 11),
    y: Math.round(Math.random() * 11)
  });
  const [goalPos, setGoalPos] = useState({
    x: Math.round(Math.random() * 11),
    y: Math.round(Math.random() * 11)
  });
  const [queue, setQueue] = useState([[startPos.x, startPos.y, 0]]);
  const [visited, setVisited] = useState(new Array(n).fill(false).map(() => new Array(n).fill(false)));
  const [k, setK] = useState(0);
  const [nx, setNx] = useState(0);
  const [ny, setNy] = useState(0);
  const [nPosInitialized, setNPosInitialized] = useState(false);
  const [intervalHandler, setIntervalHandler] = useState(0);
  const startButtonRef = useRef<HTMLButtonElement>(null);

  const initializeGrid = () => {
    const gridCopy = [...grid];
    const visitedCopy = [...visited];
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

    visitedCopy[startPos.x][startPos.y] = true;

    setGrid(gridCopy);
    setVisited(visitedCopy);
  };

  const minimumMoves = () => {
    // const n = grid.length;
    // const n = 12;
    // const visited = new Array(n).fill(false).map(() => new Array(n).fill(false));
    // const queue: Point[] = [[startPos.x, startPos.y, 0]];
    // visited[startPos.x][startPos.y] = true;
    type Point = [number, number, number];
    const visitedCopy = [...visited];
    const queueCopy = [...queue];
    
    const isBlocked = (x: number, y: number) => grid[x][y] === 'X';
    const isInsideGrid = (x: number, y:number) => x >= 0 && x < n && y >= 0 && y < n;
    
    const dx = [0, 0, 1, -1]; // possible moves in row direction
    const dy = [1, -1, 0, 0]; // possible moves in column direction

    console.log("QUEUE ", queueCopy.length);
    
    // while (queueCopy.length) {
    if(queueCopy.length > 0) {
      // const [x, y, dist] = queueCopy.shift() as Point;
      const [x, y, dist] = queueCopy[0] as Point;
      // console.log("VISITED", visited);
      if (x === goalPos.x && y === goalPos.y) {
        // console.log("GRID", grid);
        // return dist;
        console.info("FINAL DISTANCE", dist);
        clearInterval(intervalHandler);  
      }
      // for (let k = 0; k < 4; k++) {
      if (k >=0 && k < 4) {
        console.log("K VALUE", k);
        // let nx = x + dx[k];
        // let ny = y + dy[k];
        if(!nPosInitialized) {
          setNx(x + dx[k]);
          setNy(y + dy[k]);
          setNPosInitialized(true);
          console.warn("INITIALIZED");
          return;
        }
        // while (isInsideGrid(nx, ny) && !isBlocked(nx, ny)) {
        if (isInsideGrid(nx, ny) && !isBlocked(nx, ny)) {
            if (!visitedCopy[nx][ny]) {
                queueCopy.push([nx, ny, dist + 1]);
                visitedCopy[nx][ny] = true;
                setQueue(queueCopy);
                setVisited(visitedCopy);
                console.log("POINT PUSHED");
            }
            // nx += dx[k];
            // ny += dy[k];
            setNx(prevNx => prevNx + dx[k]);
            setNy(prevNy => prevNy +dy[k]);
        } else {
          setK(prevK => prevK + 1);
          setNPosInitialized(false);
        }
      } else {
        setK(prevK => 0);
        setNPosInitialized(false);
        queueCopy.shift();
        setQueue(queueCopy);
      }
    } else {
      console.warn("UNREACHABLE GOAL");
      clearInterval(intervalHandler);
    }
    // console.log("VISITED", visited);
    // console.log("GRID", grid);
    // return -1; // unreachable goal
}

  const step = () => {
    // const result:number = minimumMoves();
    // console.log("$$$$$$$$$$$$RESULT", result);
    // const intervalId = setInterval(minimumMoves, 1000);
    // setIntervalHandler(intervalId);
    minimumMoves();
    // const startButton = 
    // startButtonRef.current?.click();
  };

  const stopProcessing = () => {
    clearInterval(intervalHandler);
  }

  const startProcessing = () => {
    // startButtonRef.current?.click;
    const intervalId = setInterval(() => startButtonRef.current?.click(), 500);
    setIntervalHandler(intervalId);
  }

  useEffect(() =>{
    initializeGrid();
  },[]);

  return (
    <div className="App">
      <button
        id='start-button'
        ref={startButtonRef}
        className='start-button'
        onClick={step}
      >
        Step
      </button>
      <button
        className='start-button'
        onClick={startProcessing}
      >
        Start
      </button>
      <button 
        className='start-button'
        onClick={stopProcessing}
      >
        Stop
      </button>
      <Board
        grid={grid}
        position ={[nx, ny]}
      />        
    </div>
  )
}

export default App
