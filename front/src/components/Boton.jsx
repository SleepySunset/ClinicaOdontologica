const Boton = ({ text, onClick, visibility }) => {
  return (
    <button className="btn" onClick={onClick} hidden={visibility}>
      {text}
    </button>
  );
};

export default Boton;
