import './Board/styles.css';
import Piece from './Piece';

interface BoardProps {
  grid: string[][];
  position: number[];
}

const Board:React.FC<BoardProps> = ({
  grid,
  position:pos
}) => {

  return (
    <div className="board">
      {grid.map((row:string[], i) => {
        return row.map((item: string, j) => {
          const id = `${i}-${j}`
          const highlight:boolean = id === `${pos[0]}-${pos[1]}`;
          return<Piece key={`${i}-${j}`} id={id} text={item} highlight={highlight}/>
        })
      })}
    </div>
  )
}

export default Board