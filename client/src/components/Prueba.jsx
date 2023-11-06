import { useEffect, useState } from "react";
import axios from "axios";

const Prueba = () => {
  const [id, setId] = useState(0);
  const [estado, setestado] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Realizar la solicitud HTTP y actualizar el estado 'data' con los datos obtenidos
    axios
      .get("http://localhost:8082/task/listar")
      .then((response) => {
        console.log("Tasks:", response.data);
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, []);

  useEffect(() => {
    // Realizar la solicitud HTTP y actualizar el estado 'data' con los datos obtenidos

    axios
      .get("http://localhost:8082/prioridad/listar")
      .then((response) => {
        console.log("Prioridades:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, []);

  useEffect(() => {
    // Realizar la solicitud HTTP y actualizar el estado 'data' con los datos obtenidos
    axios
      .get("http://localhost:8082/estado/listar")
      .then((response) => {
        console.log("Estados:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/estado/crear", { nombre: estado, id: id })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formatear la fecha de manera legible
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .delete(`http://localhost:8082/estado/eliminar/${id}`)
  //     .then((response) => {
  //       console.log("Respuesta del servidor:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error al realizar la solicitud:", error);
  //     });
  // };

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>Título:</strong> {task.titulo}
            <br />
            <strong>Contenido:</strong> {task.contenido}
            <br />
            <strong>Fecha de Creación:</strong> {formatDate(task.fechaCreacion)}
            <br />
            <strong>Fecha de Vencimiento:</strong>{" "}
            {formatDate(task.fechaVencimiento)}
            <br />
            <strong>Prioridad:</strong> {task.prioridad}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prueba;
