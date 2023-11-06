/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { getContrastingTextColor } from "./getContrastColor";
import { formatDate } from "./formatDate";

const Modal = ({ task, closeModal, setRecargar }) => {
  const [taskData, setTaskData] = useState({
    titulo: "",
    contenido: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    prioridad: "",
    estado: null,
    color: "#ffffff",
  });
  const [prioridades, setPrioridades] = useState([]);
  const [textColor, setTextColor] = useState(
    task === undefined ? "#000000" : getContrastingTextColor(task.color)
  );
  const [checkEstado, setCheckEstado] = useState(
    task !== undefined ? (task.estado === "Completado" ? true : false) : false
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setTaskData({
        ...taskData,
        [name]: checked ? "Completado" : "Pendiente",
      });
    } else {
      setTaskData({ ...taskData, [name]: value });
    }
  };

  const handleColor = (e) => {
    const newColor = e.target.value;
    setTaskData({ ...taskData, color: newColor });
    setTextColor(getContrastingTextColor(newColor));
  };

  useEffect(() => {
    if (task) {
      setTaskData({
        titulo: task.titulo,
        contenido: task.contenido,
        fechaCreacion: task.fechaCreacion,
        fechaVencimiento: task.fechaVencimiento,
        prioridad: task.prioridad,
        estado: task.estado || "Pendiente",
        color: task.color,
      });
    }
  }, [task]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecargar(false);
    const formattedTask = {
      ...taskData,

      fechaCreacion: task ? taskData.fechaCreacion : new Date().toISOString(),
      fechaVencimiento: new Date(taskData.fechaVencimiento).toISOString(),
    };

    console.log(
      "estado: ",
      formattedTask.fechaVencimiento < new Date().toISOString()
    );
    const url = task
      ? `http://localhost:8082/task/actualizar/${task.id}`
      : "http://localhost:8082/task/crear";

    axios
      .request({
        method: task ? "put" : "post",
        url: url,
        data: {
          ...formattedTask,
          estado: checkEstado
            ? "Completado"
            : formattedTask.fechaVencimiento < new Date().toISOString()
            ? "Vencido"
            : "Pendiente",
        },
      })
      .then((response) => {
        console.log("Tarea guardada exitosamente", response.data);
        closeModal();
        setRecargar(true);
      })
      .catch((error) => {
        console.error("Error al guardar la tarea", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-60">
      <form
        onSubmit={handleSubmit}
        className="relative rounded shadow-lg p-8 w-2/3"
        style={{ backgroundColor: taskData.color ? taskData.color : "#ffffff" }}
      >
        {task !== undefined && (
          <div
            className="absolute bottom-5 left-5 p-4 text-sm"
            style={{ color: textColor }}
          >
            Creado: {formatDate(taskData.fechaCreacion)}
          </div>
        )}
        <input
          type="text"
          placeholder="Título"
          name="titulo"
          className="mb-2 p-2 w-full outline-none font-bold text-2xl rounded bg-transparent"
          style={{ color: textColor }}
          value={taskData.titulo}
          onChange={handleChange}
          required
        />
        <textarea
          placeholder="Contenido"
          name="contenido"
          rows="10"
          className="mb-2 p-2 no-scrollbar w-full outline-none rounded resize-none bg-transparent text-base"
          style={{ color: textColor }}
          value={taskData.contenido}
          onChange={handleChange}
        />
        <div className="flex justify-between my-4 items-center flex-wrap gap-4">
          <div className="flex flex-col w-1/6 min-w-min">
            <label
              style={{ color: textColor }}
              className="text-sm font-semibold mb-1"
            >
              Fecha de Vencimiento:
            </label>
            <input
              type="datetime-local"
              placeholder="Fecha de vencimiento"
              name="fechaVencimiento"
              className="p-2 border rounded outline-ripe-plum-200 w-11/12"
              value={
                taskData.fechaVencimiento
                  ? new Date(
                      new Date(taskData.fechaVencimiento).getTime() -
                        5 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ""
              }
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col w-1/6 min-w-min">
            <label
              style={{ color: textColor }}
              className="text-sm font-semibold mb-1"
            >
              Prioridad:
            </label>
            <select
              name="prioridad"
              className="p-2 border rounded outline-ripe-plum-200 w-full"
              value={taskData.prioridad}
              onChange={handleChange}
            >
              <option>Selecciona una prioridad</option>
              {prioridades.map((prioridad) => (
                <option
                  key={prioridad.id}
                  style={{ backgroundColor: prioridad.color }}
                  value={prioridad.nombre}
                >
                  {prioridad.nombre}
                </option>
              ))}
            </select>
          </div>

          {task && task.estado ? (
            <div className="flex flex-col w-1/6 min-w-min">
              <label className="text-sm font-semibold mb-1 mr-4">Estado:</label>
              <div className="flex items-center gap-2">
                <p className="text-sm">{task.estado}</p>
                <span
                  className="text-xl w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      task.estado === "Completado"
                        ? "green"
                        : task.estado === "Pendiente"
                        ? "orange"
                        : "red",
                  }}
                ></span>
              </div>
            </div>
          ) : null}

          <div className="flex flex-col w-1/6 min-w-min">
            <div className="flex items-center">
              <input
                className="outline-ripe-plum-200 rounded-full h-4 w-4 cursor-pointer border-primary text-primary text-sm focus:ring-2 focus:ring-primary"
                type="checkbox"
                id="checkboxDefault"
                name="estado"
                checked={checkEstado}
                onChange={() => setCheckEstado(!checkEstado)}
              />

              <label className="cursor-pointer" htmlFor="checkboxDefault">
                <span
                  style={{ color: textColor }}
                  className=" text-base ml-2 text-md"
                >
                  Completado
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-col w-1/6 min-w-min">
            <div className="flex items-end">
              <label
                htmlFor="color"
                className="cursor-pointer"
                style={{ color: textColor }}
              >
                <span className="text-sm mr-2">Color:</span>
              </label>
              <div className="relative rounded-full w-7 h-7">
                <input
                  type="color"
                  id="color"
                  name="color"
                  value={taskData.color}
                  onChange={handleColor}
                  className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                  style={{ backgroundColor: textColor }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: taskData.color,
                    border: "1px solid #000",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 mr-2 bg-red-500 hover:bg-red-600 focus:ring focus:ring-red-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 focus:ring focus:ring-green-400 text-white rounded-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
