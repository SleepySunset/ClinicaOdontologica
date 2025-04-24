import { ENDPOINTS } from "../config/config";
import { useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";

const GuardarPaciente = ({ onClose, onRefresh }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
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

    if (!dni.trim()) {
      newErrors.dni = "El DNI es obligatorio";
    } else if (!/^\d{4,10}$/.test(dni)) {
      newErrors.dni = "Debe contener sólo números (4 a 10 dígitos)";
    }

    if (!fechaIngreso.trim()) {
      newErrors.fechaIngreso = "La fecha de ingreso es obligatoria";
    }

    if (!calle.trim()) {
      newErrors.calle = "La calle es obligatoria";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(calle)) {
      newErrors.calle = "La calle sólo debe contener letras";
    }

    if (!numero.trim()) {
      newErrors.numero = "El número es obligatorio";
    } else if (!/^\d{1,4}$/.test(numero)) {
      newErrors.numero = "Debe contener sólo números (1 a 4 dígitos)";
    }

    if (!localidad.trim()) {
      newErrors.localidad = "La localidad es obligatoria";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(localidad)) {
      newErrors.localidad = "La localidad sólo debe contener letras";
    }

    if (!provincia.trim()) {
      newErrors.provincia = "La provincia es obligatoria";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(provincia)) {
      newErrors.provincia = "La provincia sólo debe contener letras";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const domicilioResponse = await axios.post(ENDPOINTS.DOMICILIO, {
        calle,
        numero,
        localidad,
        provincia,
      });

      const domicilio_id = domicilioResponse.data.data.id;

      const pacienteResponse = await axios.post(ENDPOINTS.PACIENTE, {
        nombre,
        apellido,
        dni,
        fechaIngreso,
        domicilio_id,
      });

      console.log("Paciente creado con éxito", pacienteResponse.data);

      setNombre("");
      setApellido("");
      setDni("");
      setFechaIngreso("");
      setCalle("");
      setNumero("");
      setLocalidad("");
      setProvincia("");
      onClose();
      onRefresh();
      alert("Paciente creado con éxito");
    } catch (error) {
      console.error("Error al guardar paciente y domicilio: ", error);
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
            <label>DNI</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
            {errors.dni && <small className="error">{errors.dni}</small>}
          </div>

          <div className="div-form">
            <label>Fecha de Ingreso</label>
            <input
              type="date"
              id="fechaIngreso"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
            />
            {errors.fechaIngreso && (
              <small className="error">{errors.fechaIngreso}</small>
            )}
          </div>

          <div className="div-form">
            <label>Calle</label>
            <input
              type="text"
              id="calle"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
            />
            {errors.calle && <small className="error">{errors.calle}</small>}
          </div>

          <div className="div-form">
            <label>Número</label>
            <input
              type="number"
              id="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
            {errors.numero && <small className="error">{errors.numero}</small>}
          </div>

          <div className="div-form">
            <label>Localidad:</label>
            <input
              type="text"
              id="localidad"
              value={localidad}
              onChange={(e) => setLocalidad(e.target.value)}
            />
            {errors.localidad && (
              <small className="error">{errors.localidad}</small>
            )}
          </div>

          <div className="div-form">
            <label>Provincia:</label>
            <input
              type="text"
              id="provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            />
            {errors.provincia && (
              <small className="error">{errors.provincia}</small>
            )}
          </div>

          <Boton text="Guardar Paciente" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default GuardarPaciente;
