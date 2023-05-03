import './Board/styles.css';
import Piece from './Piece';

interface BoardProps {
  grid: string[];
}

const Board:React.FC<BoardProps> = ({
  grid
}) => {

  return (
    <div className="board">
      {grid.map(item => <Piece text={item} />)}
    </div>
  )
}

export default Board