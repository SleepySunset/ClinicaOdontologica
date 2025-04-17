import { useState } from "react";
import Boton from "./Boton";
import { BotonAccion } from "./BotonAccion";
import PropTypes from "prop-types";

export function Guardar({
  entidad,
  id,
  endpoint,
  metodo,
  manejarVerMenos,
  manejarActualizar,
}) {
  const URL = `http://localhost:8081/${entidad}/${endpoint}`;

  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [nroMatricula, setNroMatricula] = useState("");
  const [fecha, setFecha] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [pacienteId, setPacienteId] = useState("");
  const [odontologoId, setOdontologoId] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarEnvio = (e) => {
    e.preventDefault();

    let datosForm;
    if (entidad === "paciente") {
      datosForm = {
        id,
        nombre,
        apellido,
        dni,
        fecha,
        domicilio: {
          calle,
          numero,
          localidad,
          provincia,
        },
      };
    } else if (entidad === "odontologo") {
      datosForm = {
        id,
        nombre,
        apellido,
        nroMatricula,
      };
    } else if (entidad === "turno") {
      datosForm = {
        id,
        pacienteId,
        odontologoId,
        fecha,
      };
    }

    fetch(`${URL}`, {
      method: `${metodo}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosForm),
    })
      .then((response) => response.json())
      .then(() => {
        setApellido("");
        setNombre("");
        setDni("");
        setNroMatricula("");
        setFecha("");
        setCalle("");
        setNumero("");
        setLocalidad("");
        setProvincia("");
        setPacienteId("");
        setOdontologoId("");
        setMensaje("Datos guardados con éxito");
        manejarActualizar();
        setTimeout(() => {
          setMensaje("");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setMensaje("Ha ocurrido un error");
        setTimeout(() => {
          setMensaje("");
        }, 3000);
      });
  };

  const renderizarForm = () => {
    if (entidad === "paciente") {
      return (
        <form onSubmit={manejarEnvio}>
          {id && (
            <div className="div-form">
              <label>ID</label>
              <input type="text" id="id" value={id} readOnly />
            </div>
          )}

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
          {mensaje}
          <Boton
            texto={
              metodo === "POST" ? "Guardar paciente" : "Actualizar paciente"
            }
            type="submit"
          />
        </form>
      );
    } else if (entidad === "odontologo") {
      return (
        <form onSubmit={manejarEnvio}>
          {id && (
            <div className="div-form">
              <label>ID</label>
              <input type="text" id="id" value={id} readOnly />
            </div>
          )}

          <div className="div-form">
            <label>Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
            <label>Nro Matrícula</label>
            <input
              type="text"
              id="nroMatricula"
              value={nroMatricula}
              onChange={(e) => setNroMatricula(e.target.value)}
              required
            />
          </div>
          {mensaje}
          <Boton
            texto={
              metodo === "POST" ? "Guardar odontólogo" : "Actualizar odontólogo"
            }
            type="submit"
          />
        </form>
      );
    } else if (entidad === "turno") {
      return (
        <form onSubmit={manejarEnvio}>
          {id && (
            <div className="div-form">
              <label>ID</label>
              <input type="text" id="id" value={id} readOnly />
            </div>
          )}

          <div className="div-form">
            <label>Paciente ID</label>
            <input
              type="number"
              id="pacienteid"
              value={pacienteId}
              onChange={(e) => setPacienteId(e.target.value)}
              required
            />
          </div>

          <div className="div-form">
            <label>Odontólogo ID</label>
            <input
              type="number"
              id="odontologoid"
              value={odontologoId}
              onChange={(e) => setOdontologoId(e.target.value)}
              required
            />
          </div>

          <div className="div-form">
            <label>Fecha</label>
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </div>
          {mensaje}
          <Boton
            texto={metodo === "POST" ? "Guardar turno" : "Actualizar turno"}
            type="submit"
          />
        </form>
      );
    }
  };

  return (
    <div className="container-guardar">
      <div className="container-form">{renderizarForm()}</div>
      <BotonAccion tipo="cerrar" manejarClick={manejarVerMenos} />
    </div>
  );
}

Guardar.propTypes = {
  entidad: PropTypes.string,
  id: PropTypes.number,
  endpoint: PropTypes.string.isRequired,
  metodo: PropTypes.oneOf(["POST", "PUT"]).isRequired,
  manejarVerMenos: PropTypes.func.isRequired,
  manejarActualizar: PropTypes.func,
};
