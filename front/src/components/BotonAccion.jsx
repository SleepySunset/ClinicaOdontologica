import PropTypes from "prop-types";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";

export function BotonAccion({ tipo, manejarClick }) {
  if (tipo === "modificar") {
    return (
      <button className="btn-accion" onClick={manejarClick}>
        <FiEdit2 className="btn-tabla" />
      </button>
    );
  } else if (tipo === "eliminar") {
    return (
      <button className="btn-accion" onClick={manejarClick}>
        <AiOutlineDelete className="btn-tabla" />
      </button>
    );
  } else if (tipo === "cerrar") {
    return (
      <button className="btn-cerrar-container" onClick={manejarClick}>
        <IoIosCloseCircle
          className="btn-cerrar"
          color={"#2F4156"}
          size={"40px"}
        />
      </button>
    );
  }
}

BotonAccion.propTypes = {
  tipo: PropTypes.string,
  manejarClick: PropTypes.func,
};
