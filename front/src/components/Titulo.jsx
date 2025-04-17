import PropTypes from "prop-types";

export function Titulo({ texto }) {
  return (
    <div className="titulo">
      <h1>{texto}</h1>
    </div>
  );
}

Titulo.propTypes = {
  texto: PropTypes.string.isRequired,
};
