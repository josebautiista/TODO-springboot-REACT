import { useEffect, useState } from "react";
import axios from "axios";
import { SketchPicker } from "react-color";
import { getContrastingTextColor } from "../components/getContrastColor";
import ModalDelete from "../components/ModalDelete";

const Prioridades = () => {
  const [prioridades, setPrioridades] = useState([]);
  const [nuevaPrioridad, setNuevaPrioridad] = useState({
    nombre: "",
    color: "#000000",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoActualizacion, setModoActualizacion] = useState(false);
  const [prioridadAActualizar, setPrioridadAActualizar] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openModalDelete = (id) => {
    setModalDelete(true);
    setDeleteId(id);
  };

  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModoActualizacion(false);
    setNuevaPrioridad({ nombre: "", color: "#000000" });
  };

  const openModalActualizar = (prioridad) => {
    setIsModalOpen(true);
    setModoActualizacion(true);
    setNuevaPrioridad({ ...prioridad });
    setPrioridadAActualizar(prioridad);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModoActualizacion(false);
    setNuevaPrioridad({ nombre: "", color: "#000000" });
    setPrioridadAActualizar(null);
  };

  useEffect(() => {
    cargarPrioridades();
  }, []);

  const cargarPrioridades = () => {
    axios
      .get("http://localhost:8082/prioridad/listar")
      .then((response) => {
        setPrioridades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  };

  const agregarPrioridad = (e) => {
    e.preventDefault();
    if (modoActualizacion) {
      axios
        .put(
          `http://localhost:8082/prioridad/actualizar/${prioridadAActualizar.id}`,
          nuevaPrioridad
        )
        .then(() => {
          console.log("Prioridad actualizada exitosamente");
          cargarPrioridades();
          closeModal();
        })
        .catch((error) => {
          console.error("Error al actualizar la prioridad", error);
        });
    } else {
      axios
        .post("http://localhost:8082/prioridad/crear", nuevaPrioridad)
        .then(() => {
          console.log("Prioridad creada exitosamente");
          cargarPrioridades();
          closeModal();
        })
        .catch((error) => {
          console.error("Error al crear la prioridad", error);
        });
    }
  };

  const eliminarPrioridad = (id) => {
    axios
      .delete(`http://localhost:8082/prioridad/eliminar/${id}`)
      .then(() => {
        console.log("Prioridad eliminada correctamente");
        cargarPrioridades();
        closeModalDelete();
      })
      .catch((error) => {
        console.error("Error al eliminar la prioridad", error);
      });
  };

  const handleColorChange = (color) => {
    setNuevaPrioridad({ ...nuevaPrioridad, color: color.hex });
  };

  return (
    <div className="container mx-auto mt-8 p-6">
      <h1 className="text-3xl text-ripe-plum-100 font-bold mb-4">
        Gestión de Prioridades
      </h1>

      <ul>
        {prioridades.map((prioridad) => (
          <li
            key={prioridad.id}
            className={`mb-2 flex justify-between items-center rounded p-4`}
            style={{
              backgroundColor: prioridad.color || "#fff",
              color: getContrastingTextColor(prioridad.color),
            }}
          >
            <div>{prioridad.nombre}</div>
            <div className="flex items-center space-x-2">
              <button
                className={`text-white hover:text-gray-200 focus:outline-none rounded-md p-2 bg-green-600`}
                onClick={() => openModalActualizar(prioridad)}
              >
                Actualizar
              </button>
              <button
                className={`text-white hover:text-gray-200 focus:outline-none rounded-md p-2 bg-red-600`}
                onClick={() => openModalDelete(prioridad.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={openModal}
        className="w-14 h-14 rounded-full fixed bottom-10 right-10 z-50 bg-gradient-to-r from-ripe-plum-400 to-ripe-plum-500 hover-from-ripe-plum-500 hover-to-ripe-plum-600 text-ripe-plum-50 text-4xl hover-cursor-pointer"
      >
        +
      </button>

      {modalDelete && (
        <ModalDelete
          id={deleteId}
          eliminar={eliminarPrioridad}
          cancelar={closeModalDelete}
          objeto={"esta prioridad"}
        />
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60">
          <div className="relative rounded-lg shadow-lg p-8 bg-ripe-plum-400">
            <h2 className="text-2xl text-white font-bold mb-4">
              {modoActualizacion ? "Actualizar Prioridad" : "Crear Prioridad"}
            </h2>
            <form onSubmit={agregarPrioridad}>
              <div className="mb-4">
                <label className="block text-white text-base font-medium">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full py-2 px-4 border rounded-md bg-white text-gray-800 focus-outline-none outline-none"
                  value={nuevaPrioridad.nombre}
                  onChange={(e) =>
                    setNuevaPrioridad({
                      ...nuevaPrioridad,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-base font-medium">
                  Color
                </label>
                <SketchPicker
                  color={nuevaPrioridad.color}
                  onChange={handleColorChange}
                  disableAlpha={true}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 mr-2 bg-red-500 hover-bg-red-600 focus-ring focus-ring-red-400 text-white rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 hover-bg-green-600 focus-ring focus-ring-green-400 text-white rounded-md"
                >
                  {modoActualizacion ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prioridades;
