/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { formatDate } from "../components/formatDate";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import {
  getContrastingDeleteColor,
  getContrastingTextColor,
} from "../components/getContrastColor";
import ModalDelete from "../components/ModalDelete";

const Note = ({ task, setRecargar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, titulo, contenido, fechaVencimiento, estado, color, prioridad } =
    task;
  const [modalDelete, setModalDelete] = useState(false);
  const [prioridades, setPrioridades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/prioridad/listar")
      .then((response) => {
        setPrioridades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8082/estado/listar")
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRecargar(true);
  };

  const openModalDelete = () => {
    setModalDelete(true);
  };

  const closeModalDelete = () => {
    setModalDelete(false);
    setRecargar(true);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    setRecargar(false);
    axios
      .delete(`http://localhost:8082/task/eliminar/${id}`)
      .then(() => {
        console.log("Prioridad eliminada correctamente");
        setModalDelete(false);
        setRecargar(true);
      })
      .catch((error) => {
        console.error("Error al eliminar la prioridad", error);
      });
  };

  const buscarPrioridadColor = (prioridad) => {
    const prioridadEncontrada = prioridades.find(
      (prioridadEncontrada) => prioridadEncontrada.nombre === prioridad
    );
    if (prioridadEncontrada) {
      const borderColor = prioridadEncontrada.color || "#ffffff";
      return borderColor;
    }
    return "#ffffff";
  };

  const buscarEstadoColor = (estado) => {
    const estadoEncontrado = estados.find(
      (estadoEncontrado) => estadoEncontrado.nombre === estado
    );
    if (estadoEncontrado) {
      const borderColor = estadoEncontrado.color || "#ffffff";
      return borderColor;
    }
    return "#ffffff";
  };

  const MaxContentLength = 230;

  const truncatedContent =
    contenido.length > MaxContentLength
      ? contenido.slice(0, MaxContentLength) + "..."
      : contenido;

  return (
    <>
      <div
        style={{
          backgroundColor: color ? color : "#ffffff",
          color: color ? getContrastingTextColor(color) : "#000000",
          borderBottom: `5px solid ${buscarPrioridadColor(prioridad)} `,
        }}
        className="w-60 min-w-min rounded-md p-4 max-h-72 flex flex-col justify-between"
      >
        <AiOutlineDelete
          color={color ? getContrastingDeleteColor(color) : "#000000"}
          size={20}
          onClick={openModalDelete}
          className="relative top-0 left-48 cursor-pointer"
        />

        <div
          onClick={openModal}
          className="flex justify-start flex-col h-60 cursor-pointer"
        >
          <h1 className="text-base font-bold flex justify-between items-center mb-2">
            {titulo}{" "}
          </h1>
          <p className="text-sm">{truncatedContent}</p>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs">Expira: {formatDate(fechaVencimiento)}</p>
          <p
            className={`text-xl  w-3 h-3 rounded-full`}
            style={{ backgroundColor: buscarEstadoColor(estado) }}
          ></p>
        </div>
      </div>
      {isModalOpen ? (
        <Modal task={task} closeModal={closeModal} setRecargar={setRecargar} />
      ) : null}
      {modalDelete && (
        <ModalDelete
          eliminar={handleDelete}
          cancelar={closeModalDelete}
          objeto={"esta tarea"}
        />
      )}
    </>
  );
};

export default Note;
