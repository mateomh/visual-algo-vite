import './Piece/styles.css';

interface PieceProps {
  text: string;
  id: string;
  highlight: boolean;
}

const Piece:React.FC<PieceProps> = ({
  text,
  id,
  highlight
}) => {
  const style = highlight ? {backgroundColor:'red'} : {}
  return (
    <div className='piece' id={id} style={style}>
      {text}
    </div>
  )
}

export default Piece