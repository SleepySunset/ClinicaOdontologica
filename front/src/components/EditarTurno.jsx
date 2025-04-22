import { ENDPOINTS } from "../config/config";
import { useEffect, useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const EditarTurno = ({ onClose, id, onRefresh }) => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [odontologoId, setOdontologoId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTurnoId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ENDPOINTS.TURNO}/${id}`);

        const dateObj = new Date(response.data.data.fecha);
        const localDate = dateObj.toISOString().split("T")[0];
        const localTime = dateObj.toTimeString().slice(0, 5);

        setFecha(localDate);
        setHora(localTime);

        setPacienteId(response.data.data.paciente.id);
        setOdontologoId(response.data.data.odontologo.id);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTurnoId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localDateTime = new Date(`${fecha}T${hora}`);
    const utcDateTime = localDateTime.toISOString();

    try {
      const turnoResponse = await axios.put(`${ENDPOINTS.TURNO}/${id}`, {
        fecha: utcDateTime,
        paciente_id: pacienteId,
        odontologo_id: odontologoId,
      });

      console.log("Turno actualizado con éxito", turnoResponse.data);

      setFecha("");
      setPacienteId("");
      setOdontologoId("");
      onClose();
      onRefresh();
      alert("Turno actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar turno: ", error);
    }
  };

  return (
    <div className="modalContainer">
      <div className="createModal">
        <IoCloseSharp onClick={onClose} />
        {loading ? (
          <div className="loading">
            <ClipLoader size={50} color={"#3e7cd4"} />
            <p>
              Conectando con la base de datos, por favor espera unos segundos...
            </p>
          </div>
        ) : (
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

            <Boton text="Actualizar Turno" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarTurno;
