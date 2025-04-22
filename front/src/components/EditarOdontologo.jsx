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

  useEffect(() => {
    const fetchOdontologoId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ENDPOINTS.ODONTOLOGO}/${id}`);
        setNombre(response.data.data.nombre);
        setApellido(response.data.data.apellido);
        setMatricula(response.data.data.matricula);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchOdontologoId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const odontologoResponse = await axios.put(`${ENDPOINTS.ODONTOLOGO}/${id}`, {
        nombre,
        apellido,
        matricula
      });

      console.log("Odontólogo actualizado con éxito", odontologoResponse.data);

      setNombre("");
      setApellido("");
      setMatricula("");
      onClose();
      onRefresh();
      alert("Odontólogo actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar odontólogo: ", error);
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
              <label>Nro de matrícula</label>
              <input
                type="text"
                id="matricula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                required
              />
            </div>

            <Boton text="Actualizar Odontólogo" type="submit" />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarOdontologo;
