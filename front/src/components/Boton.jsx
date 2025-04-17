const Boton = ({ text, manejarClick, visibilidad }) => {
  return (
    <button className="btn" onClick={manejarClick} hidden={visibilidad}>
      {text}
    </button>
  );
};

export default Boton;
