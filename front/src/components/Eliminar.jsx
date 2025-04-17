import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export function Eliminar({ entidad, id, manejarActualizar }) {
  const [mensaje, setMensaje] = useState("");
  const [eliminado, setEliminado] = useState(false);

  useEffect(() => {
    if (!eliminado) {
      const URL = `http://localhost:8081/${entidad}/eliminar/${id}`;

      fetch(URL, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(() => {
          setMensaje(`${entidad} eliminado con éxito`);
          setTimeout(() => {
            setMensaje("");
          }, 3000);
          setEliminado((prev) => !prev);
          manejarActualizar();
        })
        .catch(() => {
          setMensaje("Ha ocurrido un error");
          setTimeout(() => {
            setMensaje("");
          }, 3000);
        });
    }
  }, [eliminado, entidad, id, manejarActualizar]);

  return <span>{mensaje}</span>;
}

Eliminar.propTypes = {
  id: PropTypes.number.isRequired,
  entidad: PropTypes.string.isRequired,
  manejarActualizar: PropTypes.func,
};
