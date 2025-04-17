import PropTypes from "prop-types";

export function Boton({ texto, manejarClick, visibilidad }) {
  return (
    <button className="btn" onClick={manejarClick} hidden={visibilidad}>
      {texto}
    </button>
  );
}

Boton.propTypes = {
  texto: PropTypes.string.isRequired,
  manejarClick: PropTypes.func,
  visibilidad: PropTypes.bool,
};
