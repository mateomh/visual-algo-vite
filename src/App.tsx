import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
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

    setGrid(gridCopy);
  };

  useEffect(() =>{
    initializeGrid();
  },[]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
