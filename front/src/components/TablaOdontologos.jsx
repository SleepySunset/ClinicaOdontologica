import { useState, useEffect } from "react";
import axios from "axios";
import { ENDPOINTS } from "../config/config";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditarOdontologo from "../components/EditarOdontologo";
import GuardarOdontologo from "../components/GuardarOdontologo";
import { ClipLoader } from "react-spinners";

import Boton from "./Boton";

const TablaOdontologos = () => {
  const [odontologos, setOdontologos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOdontologos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(ENDPOINTS.ODONTOLOGO);
        setOdontologos(response.data.data);
        console.log(response.data);
      } catch (e) {
        console.log("Error al traer odontólogos:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchOdontologos();
  }, [refresh]);

  const filterLowCase = filter.toLowerCase();

  const odontologosFilter = odontologos.filter((o) => {
    return (
      o.id.toString().includes(filterLowCase) ||
      o.nombre.toLowerCase().includes(filterLowCase) ||
      o.apellido.toLowerCase().includes(filterLowCase) ||
      o.matricula.toString().includes(filterLowCase)
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
      await axios.delete(`${ENDPOINTS.ODONTOLOGO}/${id}`);
      setOdontologos((prev) => prev.filter((p) => p.id !== id));
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
        <Boton text="Crear Odontólogo" onClick={() => toggleCreateModal()} />
        <input
          type="text"
          placeholder="Buscar odontólogo..."
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
              <th>Matricula</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {odontologosFilter.map((odontologo) => (
              <tr key={odontologo.id}>
                <td>{odontologo.id}</td>
                <td>{odontologo.nombre}</td>
                <td>{odontologo.apellido}</td>
                <td>{odontologo.matricula}</td>
                <td>
                  <FaEdit onClick={() => handleEdit(odontologo.id)} />
                </td>
                <td>
                  <MdDelete
                    onClick={() => handleConfirmDelete(odontologo.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editId && (
        <EditarOdontologo
          id={editId}
          onClose={() => setEditId(null)}
          onRefresh={() => setRefresh(!refresh)}
        />
      )}
      {confirmDelete && (
        <div className="modalContainer">
          <div className="deleteModal">
            <p>
              ¿Estás segur@ que deseas eliminar al odontólogo{" "}
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

      {openCreate && (
        <GuardarOdontologo
          onClose={toggleCreateModal}
          onRefresh={() => setRefresh(!refresh)}
        />
      )}
    </div>
  );
};

export default TablaOdontologos;
