import { useEffect, useState } from "react";
import Note from "../atomos/Note";
import axios from "axios";
import NewNote from "../components/NewNote";

const AllNotes = () => {
  const [tasks, setTasks] = useState([]);
  const [recargar, setRecargar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8082/task/listar")
      .then((response) => {
        const sortedTasks = response.data.sort((a, b) => {
          const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
          if (priorityOrder[a.prioridad] < priorityOrder[b.prioridad]) {
            return -1;
          } else if (priorityOrder[a.prioridad] > priorityOrder[b.prioridad]) {
            return 1;
          } else {
            return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
          }
        });

        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error("Error al obtener la información", error);
      });
  }, [recargar]);

  return (
    <section className="w-3/4 box-border my-0 mx-auto flex items-center justify-center">
      <NewNote setRecargar={setRecargar} />
      {tasks.length > 0 ? (
        <div className=" content-start h-full py-6 overflow-scroll no-scrollbar w-full flex-wrap justify-center flex items-start gap-4 max-w-7xl">
          {tasks.map((task) => (
            <Note setRecargar={setRecargar} key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center text-ripe-plum-100 text-xl">
          No hay tareas para mostrar
        </div>
      )}
    </section>
  );
};

export default AllNotes;
