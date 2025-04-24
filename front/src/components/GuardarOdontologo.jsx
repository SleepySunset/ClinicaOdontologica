import { ENDPOINTS } from "../config/config";
import { useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";

const GuardarOdontologo = ({ onClose, onRefresh }) => {
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
      newErrors.nombre = "El nombre sólo debe contener letras";
    }

    if (!apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellido)) {
      newErrors.apellido = "El apellido sólo debe contener letras";
    }

    if (!matricula.trim()) {
      newErrors.matricula = "La matrícula es obligatoria";
    } else if (!/^\d{4,10}$/.test(matricula)) {
      newErrors.matricula = "Debe contener sólo números (4 a 10 dígitos)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const odontologoResponse = await axios.post(ENDPOINTS.ODONTOLOGO, {
        matricula,
        nombre,
        apellido,
      });

      console.log("Odontólogo creado con éxito", odontologoResponse.data);

      setNombre("");
      setApellido("");
      setMatricula("");
      onClose();
      onRefresh();
      alert("Odontólogo creado con éxito");
    } catch (error) {
      alert("Error al guardar odontólogo, por favor intenta de nuevo ", error);
    }
  };

  return (
    <div className="modalContainer">
      <div className="createModal">
        <IoCloseSharp onClick={onClose} />
        <form onSubmit={handleSubmit}>
          <div className="div-form">
            <label>Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre && <small className="error">{errors.nombre}</small>}
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
      </div>
    </div>
  );
};

export default GuardarOdontologo;
