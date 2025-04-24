import { ENDPOINTS } from "../config/config";
import { useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";

const GuardarTurno = ({ onClose, onRefresh }) => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [odontologoId, setOdontologoId] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!pacienteId) {
      newErrors.pacienteId = "El id del paciente es obligatorio";
    } else if (!/^\d+$/.test(pacienteId)) {
      newErrors.pacienteId = "El id solo debe contener números";
    }

    if (!odontologoId) {
      newErrors.odontologoId = "El id del odontólogo es obligatorio";
    } else if (!/^\d+$/.test(odontologoId)) {
      newErrors.odontologoId = "El id solo debe contener números";
    }

    if (!fecha.trim()) {
      newErrors.fecha = "La fecha es obligatoria";
    }

    if (!hora.trim()) {
      newErrors.hora = "La hora es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const localDateTime = new Date(`${fecha}T${hora}`);
    const utcDateTime = localDateTime.toISOString();

    try {
      const turnoResponse = await axios.post(ENDPOINTS.TURNO, {
        fecha: utcDateTime,
        paciente_id: pacienteId,
        odontologo_id: odontologoId,
      });

      console.log("Turno creado con éxito", turnoResponse.data);

      setPacienteId("");
      setOdontologoId("");
      setFecha("");
      onClose();
      onRefresh();
      alert("Turno creado con éxito");
    } catch (error) {
      const newErrors = {};
      if (
        error.response.data.errors[0].msg ===
        "El paciente_id no existe en la base de datos"
      ) {
        newErrors.pacienteId = "El paciente no es válido";
      } else if (
        error.response.data.errors[0].msg ===
        "El odontologo_id no existe en la base de datos"
      ) {
        newErrors.odontologoId = "El odontólogo no es válido";
      } else {
        newErrors.general =
          "Error inesperado al actualizar el turno, por favor intente de nuevo";
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className="modalContainer">
      <div className="createModal">
        <IoCloseSharp onClick={onClose} />
        <form onSubmit={handleSubmit}>
          <div className="div-form">
            <label>Paciente ID</label>
            <input
              type="text"
              id="pacienteid"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
            />
            {errors.pacienteId && (
              <small className="error">{errors.pacienteId}</small>
            )}
          </div>

          <div className="div-form">
            <label>Odontólogo ID</label>
            <input
              type="text"
              id="odontologoid"
              value={odontologoId}
              onChange={(e) => setOdontologoId(e.target.value)}
            />
            {errors.odontologoId && (
              <small className="error">{errors.odontologoId}</small>
            )}
          </div>

          <div className="div-form">
            <label>Fecha</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            {errors.fecha && <small className="error">{errors.fecha}</small>}
          </div>

          <div className="div-form">
            <label>Hora</label>
            <input
              type="time"
              id="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
            {errors.hora && <small className="error">{errors.hora}</small>}
          </div>

          <Boton text="Actualizar Turno" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default GuardarTurno;
