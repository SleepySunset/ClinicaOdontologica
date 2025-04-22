import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../config/config";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditarPaciente from "../components/EditarPaciente";
import GuardarPaciente from "../components/GuardarPaciente";
import { ClipLoader } from "react-spinners";

import Boton from "./Boton";

const TablaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(ENDPOINTS.PACIENTE);
        setPacientes(response.data.data);
        console.log(response.data);
      } catch (e) {
        console.log("Error al traer pacientes:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [refresh]);

  const filterLowCase = filter.toLowerCase();

  const pacientesFilter = pacientes.filter((p) => {
    return (
      p.id.toString().includes(filterLowCase) ||
      p.nombre.toLowerCase().includes(filterLowCase) ||
      p.apellido.toLowerCase().includes(filterLowCase) ||
      p.dni.toString().includes(filterLowCase)
    );
  });

  const handleEdit = (id) => {
    setEditId(id);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDelete(true);
    setDeleteId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ENDPOINTS.PACIENTE}/${id}`);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      alert("Paciente eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar paciente: ", error);
    }
  };

  const toggleCreateModal = () => {
    setOpenCreate(!openCreate);
    console.log(openCreate);
  };
  return (
    <div className="tableContainer">
      <div className="filterContainer">
        <Boton text="Crear Paciente" onClick={() => toggleCreateModal()} />
        <input
          type="text"
          placeholder="Buscar paciente..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">
          <ClipLoader size={50} color={"#3e7cd4"} />
          <p>
            Conectando con la base de datos, por favor espera unos segundos...
          </p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFilter.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.dni}</td>
                <td>
                  <FaEdit onClick={() => handleEdit(paciente.id)} />
                </td>
                <td>
                  <MdDelete onClick={() => handleConfirmDelete(paciente.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editId && <EditarPaciente id={editId} onClose={() => setEditId(null)} onRefresh={()=> setRefresh(!refresh)} />}
      {confirmDelete && (
        <div className="modalContainer">
          <div className="deleteModal">
            <p>
              ¿Estás segur@ que deseas eliminar al paciente{" "}
              <strong>{deleteId}</strong>?
            </p>
            <div className="modalButtons">
              <button
                className="btnDelete"
                onClick={() => {
                  handleDelete(deleteId);
                  setConfirmDelete(false);
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="btnCancel"
                onClick={() => setConfirmDelete(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {openCreate && <GuardarPaciente onClose={toggleCreateModal} onRefresh={()=> setRefresh(!refresh)}/>}
    </div>
  );
};

export default TablaPacientes;
