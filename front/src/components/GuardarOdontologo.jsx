import { ENDPOINTS } from "../config/config";
import { useState } from "react";
import Boton from "./Boton";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";


const GuardarOdontologo = ({ onClose, onRefresh }) => {
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const odontologoResponse = await axios.post(ENDPOINTS.ODONTOLOGO, {
        matricula,
        nombre,
        apellido    
        
      });

      console.log("Odontólogo creado con éxito", odontologoResponse.data);

      setNombre("");
      setApellido("");
      setMatricula("");
      onClose();
      onRefresh();
      alert("Odontólogo creado con éxito");
    } catch (error) {
      console.error("Error al guardar odontólogo: ", error);
    }
  };
 
  return (
    <div className="modalContainer">
      <div className="createModal">
      <IoCloseSharp onClick={onClose}/>
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

        <Boton text="Guardar Odontólogo" type="submit" />
      </form>

      </div>
      
    </div>
  );
};

export default GuardarOdontologo;
