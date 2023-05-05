import './Board/styles.css';
import Piece from './Piece';

interface BoardProps {
  grid: string[][];
}

const Board:React.FC<BoardProps> = ({
  grid
}) => {

  return (
    <div className="board">
      {grid.map((row:string[]) => {
        return row.map((item: string) => <Piece text={item} />)
      })}
    </div>
  )
}

export default Board