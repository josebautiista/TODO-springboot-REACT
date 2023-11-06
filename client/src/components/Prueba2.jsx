import axios from "axios";
import { useState } from "react";

function Prueba2() {
  const [task, setTask] = useState({
    titulo: "",
    contenido: "",
    fechaCreacion: "",
    fechaVencimiento: "",
    prioridad: "Baja",
  });

  const [nombre, setNombre] = useState({ nombre: "" });
  const [id, setId] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formatear las fechas como cadenas en el formato deseado (ISO 8601)
    const formattedTask = {
      ...task,
      fechaCreacion: new Date(task.fechaCreacion).toISOString(),
      fechaVencimiento: new Date(task.fechaVencimiento).toISOString(),
    };

    axios
      .put("http://localhost:8082/task/actualizar/1", formattedTask)
      .then((response) => {
        console.log("Tarea creada exitosamente");
      })
      .catch((error) => {
        console.error("Error al crear la tarea", error);
      });
  };

  //   const handlePrioridad = (event) => {
  //     event.preventDefault();
  //     axios
  //       .post("http://localhost:8082/prioridad/crear", nombre)
  //       .then((response) => {
  //         console.log("Tarea creada exitosamente");
  //       })
  //       .catch((error) => {
  //         console.error("Error al crear la tarea", error);
  //       });
  //   };

  const handlePrioridad = (event) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:8082/prioridad/eliminar/${id}`)
      .then((response) => {
        console.log("Prioridad eliminada correctamente");
      })
      .catch((error) => {
        console.error("Error al eliminar la prioridad", error);
      });
  };

  return (
    <div>
      <h2>Crear Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={task.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contenido:</label>
          <textarea
            name="contenido"
            value={task.contenido}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Creación:</label>
          <input
            type="datetime-local"
            name="fechaCreacion" // Cambiar el nombre para coincidir con el estado
            value={task.fechaCreacion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Vencimiento:</label>
          <input
            type="datetime-local"
            name="fechaVencimiento" // Cambiar el nombre para coincidir con el estado
            value={task.fechaVencimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prioridad:</label>
          <select
            name="prioridad"
            value={task.prioridad}
            onChange={handleChange}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit">Crear Tarea</button>
      </form>

      <form onSubmit={handlePrioridad}>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="submit" value="elimnar" />
      </form>
    </div>
  );
}

export default Prueba2;
