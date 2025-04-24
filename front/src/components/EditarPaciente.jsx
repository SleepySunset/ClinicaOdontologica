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
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

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
      } catch {
        setErrorMessage(
          "Error al obtener los datos del odontólogo, por favor intenta de nuevo"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPacienteId();
  }, [id]);

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

    if (!numero) {
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
    } catch {
      alert(
        "Error al actualizar paciente y domicilio, por favor intenta de nuevo "
      );
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
              {errors.numero && (
                <small className="error">{errors.numero}</small>
              )}
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

            <Boton text="Actualizar Paciente" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarPaciente;
