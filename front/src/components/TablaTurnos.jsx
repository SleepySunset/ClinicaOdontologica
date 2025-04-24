import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../config/config";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditarTurno from "../components/EditarTurno";
import GuardarTurno from "../components/GuardarTurno";
import { ClipLoader } from "react-spinners";
import { format } from "date-fns";
import Boton from "./Boton";

const TablaTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTurnos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(ENDPOINTS.TURNO);
        setTurnos(response.data.data);
      } catch (e) {
        console.log("Error al traer turnos:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnos();
  }, [refresh]);

  const filterLowCase = filter.toLowerCase();

  const turnosFilter = turnos.filter((t) => {
    return (
      t.id.toString().includes(filterLowCase) ||
      t.odontologo.nombre.toLowerCase().includes(filterLowCase) ||
      t.odontologo.apellido.toLowerCase().includes(filterLowCase) ||
      t.paciente.nombre.toLowerCase().includes(filterLowCase) ||
      t.paciente.apellido.toLowerCase().includes(filterLowCase)
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
      await axios.delete(`${ENDPOINTS.TURNO}/${id}`);
      setTurnos((prev) => prev.filter((p) => p.id !== id));
      alert("Odontólogo eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar odontólogo: ", error);
    }
  };

  const toggleCreateModal = () => {
    setOpenCreate(!openCreate);
    console.log(openCreate);
  };

  

  return (
    <div className="tableContainer">
      <div className="filterContainer">
        <Boton text="Crear Turno" onClick={() => toggleCreateModal()} />
        <input
          type="text"
          placeholder="Buscar turno..."
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
        <div className="tableResponsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Paciente</th>
              <th>Odontólogo</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {turnosFilter.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.id}</td>
                <td>{turno.paciente.nombre} {turno.paciente.apellido}</td>
                <td>{turno.odontologo.nombre} {turno.odontologo.apellido}</td>
                <td>{format(turno.fecha, "dd/MM/yyyy")}</td>
                <td>{format(turno.fecha, "hh:mm a")}</td>
                <td>
                  <FaEdit onClick={() => handleEdit(turno.id)} />
                </td>
                <td>
                  <MdDelete onClick={() => handleConfirmDelete(turno.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {editId && <EditarTurno id={editId} onClose={() => setEditId(null)} onRefresh={() => setRefresh(!refresh)} />}
      {confirmDelete && (
        <div className="modalContainer">
          <div className="deleteModal">
            <p>
              ¿Estás segur@ que deseas eliminar el turno {" "}
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

      {openCreate && <GuardarTurno onClose={toggleCreateModal} onRefresh={() => setRefresh(!refresh)} />}
    </div>
  );
};

export default TablaTurnos;
