import './Piece/styles.css';

interface PieceProps {
  text: string;
}

const Piece:React.FC<PieceProps> = ({
  text
}) => {
  return (
    <div className='piece'>
      {text}
    </div>
  )
}

export default Piece