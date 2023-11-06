package com.proyectTODO.TODO.controller;

import com.proyectTODO.TODO.interfaceService.ITODOService;
import com.proyectTODO.TODO.model.Estados;
import com.proyectTODO.TODO.model.TODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:5173")
public class ControllerTODO {

    @Autowired
    private ITODOService itodoService;

    @GetMapping("/listar")
    public List<TODO> listarTask() {
        List<TODO> TODO = itodoService.listarTask();
        return TODO;
    }

    @PostMapping("/crear")
    public int crearTask(@RequestBody TODO task) {
        int newTask = itodoService.saveTask(task);
        return newTask;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarTask(@PathVariable int id) {
        itodoService.deleteTask(id);
        return ResponseEntity.ok("Task eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarTask(@PathVariable int id, @RequestBody TODO task) {
        Optional<TODO> existingTask = itodoService.listIdTask(id);

        if (existingTask.isPresent()) {
            TODO updatedTask = existingTask.get();
            updatedTask.setTitulo(task.getTitulo());
            updatedTask.setContenido(task.getContenido());
            updatedTask.setFechaCreacion(task.getFechaCreacion());
            updatedTask.setFechaVencimiento(task.getFechaVencimiento());
            updatedTask.setPrioridad(task.getPrioridad());
            updatedTask.setEstado(task.getEstado());
            updatedTask.setColor(task.getColor());

            itodoService.saveTask(updatedTask);
            return ResponseEntity.ok("Tarea actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
