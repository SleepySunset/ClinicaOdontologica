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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const localDateTime = new Date(`${fecha}T${hora}`);
    const utcDateTime = localDateTime.toISOString();

    try {
      const turnoResponse = await axios.post(ENDPOINTS.TURNO, {
        fecha: utcDateTime,
        paciente_id:pacienteId,
        odontologo_id: odontologoId    
        
      });

      console.log("Turno creado con éxito", turnoResponse.data);

      setPacienteId("");
      setOdontologoId("");
      setFecha("");
      onClose();
      onRefresh();
      alert("Turno creado con éxito");
    } catch (error) {
      console.error("Error al guardar turno: ", error);
    }
  };
 
  return (
    <div className="modalContainer">
      <div className="createModal">
      <IoCloseSharp onClick={onClose}/>
      <form onSubmit={handleSubmit}>
        <div className="div-form">
          <label>Paciente ID</label>
          <input
            type="text"
            id="nombre"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
            required
          />
        </div>

        <div className="div-form">
          <label>Odontólogo ID</label>
          <input
            type="text"
            id="apellido"
            value={odontologoId}
            onChange={(e) => setOdontologoId(e.target.value)}
            required
          />
        </div>

        <div className="div-form">
          <label>Fecha</label>
          <input
            type="date"
            id="matricula"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="div-form">
          <label>Hora</label>
          <input
            type="time"
            id="hora"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <Boton text="Guardar Turno" type="submit" />
      </form>

      </div>
      
    </div>
  );
};

export default GuardarTurno;
