import { ENDPOINTS } from "../config/config";
import { useEffect, useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const EditarPaciente = ({ onClose, id, onRefresh }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPacienteId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ENDPOINTS.PACIENTE}/${id}`);
        setNombre(response.data.data.nombre);
        setApellido(response.data.data.apellido);
        setDni(response.data.data.dni);
        setFechaIngreso(response.data.data.fechaIngreso);
        setDomicilio(response.data.data.domicilio.id);
        setCalle(response.data.data.domicilio.calle);
        setNumero(response.data.data.domicilio.numero);
        setLocalidad(response.data.data.domicilio.localidad);
        setProvincia(response.data.data.domicilio.provincia);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPacienteId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const domicilioResponse = await axios.put(
        `${ENDPOINTS.DOMICILIO}/${domicilio}`,
        {
          calle,
          numero,
          localidad,
          provincia,
        }
      );
      console.log("Domicilio actualizado con éxito, ", domicilioResponse);

      const pacienteResponse = await axios.put(`${ENDPOINTS.PACIENTE}/${id}`, {
        nombre,
        apellido,
        dni,
        fechaIngreso,
        domicilio_id: domicilio,
      });

      console.log("Paciente actualizado con éxito", pacienteResponse.data);

      setNombre("");
      setApellido("");
      setDni("");
      setFechaIngreso("");
      setDomicilio("");
      setCalle("");
      setNumero("");
      setLocalidad("");
      setProvincia("");
      onClose();
      onRefresh();
      alert("Paciente actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar paciente y domicilio: ", error);
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
              <label>Nombre</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Apellido</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>DNI</label>
              <input
                type="text"
                id="dni"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Fecha de Ingreso</label>
              <input
                type="date"
                id="fechaIngreso"
                value={fechaIngreso}
                onChange={(e) => setFechaIngreso(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Calle</label>
              <input
                type="text"
                id="calle"
                value={calle}
                onChange={(e) => setCalle(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Número</label>
              <input
                type="number"
                id="numero"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Localidad:</label>
              <input
                type="text"
                id="localidad"
                value={localidad}
                onChange={(e) => setLocalidad(e.target.value)}
                required
              />
            </div>

            <div className="div-form">
              <label>Provincia:</label>
              <input
                type="text"
                id="provincia"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
              />
            </div>

            <Boton text="Actualizar Paciente" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarPaciente;
