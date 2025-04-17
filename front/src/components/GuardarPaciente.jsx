import { ENDPOINTS } from "../config/config";
import { useState } from "react";
import Boton from "./Boton";
import axios from "axios";

const GuardarPaciente = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [fecha, setFecha] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(ENDPOINTS.DOMICILIO, {
        calle,
        numero,
        localidad,
        provincia,
      });
      setDomicilio(response.data.id);
    } catch (e) {
      console.log("Error al agregar domicilio: ", e);
    }

    try {
      const response = await axios.post(ENDPOINTS.PACIENTE, {
        nombre,
        apellido,
        dni,
        fecha,
        domicilio,
      });
      console.log(response.data);

      setNombre("");
      setApellido("");
      setDni("");
      setFecha("");
      setCalle("");
      setNumero("");
      setLocalidad("");
      setProvincia("");
      setDomicilio("");
    } catch (e) {
      console.log("Error al agregar paciente: ", e);
    }
  };

  return (
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
          id="fecha"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
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

      <Boton text="Guardar Paciente" type="submit" />
    </form>
  );
};

export default GuardarPaciente;
