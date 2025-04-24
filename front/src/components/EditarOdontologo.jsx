import { ENDPOINTS } from "../config/config";
import { useEffect, useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const EditarOdontologo = ({ onClose, id, onRefresh }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchOdontologoId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ENDPOINTS.ODONTOLOGO}/${id}`);
        setNombre(response.data.data.nombre);
        setApellido(response.data.data.apellido);
        setMatricula(response.data.data.matricula);
      } catch {
        setErrorMessage(
          "Error al obtener los datos del odontólogo, por favor intenta de nuevo "
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOdontologoId();
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
      newErrors.nombre = "El nombre solo debe contener letras";
    }

    if (!apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
      newErrors.apellido = "El apellido solo debe contener letras";
    }

    if (!matricula.trim()) {
      newErrors.matricula = "La matrícula es obligatoria";
    } else if (!/^\d{4,10}$/.test(matricula)) {
      newErrors.matricula = "Debe contener solo números (4 a 10 dígitos)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const odontologoResponse = await axios.put(
        `${ENDPOINTS.ODONTOLOGO}/${id}`,
        {
          nombre,
          apellido,
          matricula,
        }
      );

      console.log("Odontólogo actualizado con éxito", odontologoResponse.data);

      setNombre("");
      setApellido("");
      setMatricula("");
      onClose();
      onRefresh();
      alert("Odontólogo actualizado con éxito");
    } catch {
      alert("Error al actualizar odontólogo, por favor intenta de nuevo");
    }
  };

  return (
    <div className="modalContainer">
      <div className="createModal">
        <IoCloseSharp onClick={onClose} />
        {loading || errorMessage ? (
          <div className="loading">
            {loading ? (
              <>
                <ClipLoader size={50} color={"#3e7cd4"} />
                <p>
                  Conectando con la base de datos, por favor espera unos
                  segundos...
                </p>
              </>
            ) : (
              <p>{errorMessage}</p>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="div-form">
              <label>Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errors.nombre && (
                <small className="error">{errors.nombre}</small>
              )}
            </div>

            <div className="div-form">
              <label>Apellido</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
              {errors.apellido && (
                <small className="error">{errors.apellido}</small>
              )}
            </div>

            <div className="div-form">
              <label>Nro de matrícula</label>
              <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              {errors.matricula && (
                <small className="error">{errors.matricula}</small>
              )}
            </div>

            <Boton text="Guardar Odontólogo" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarOdontologo;
