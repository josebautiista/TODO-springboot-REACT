package com.proyectTODO.TODO.controller;

import com.proyectTODO.TODO.interfaceService.IPrioridadService;
import com.proyectTODO.TODO.model.Estados;
import com.proyectTODO.TODO.model.Prioridad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/prioridad")
@CrossOrigin(origins = "http://localhost:5173")
public class ControllerPrioridad {

    @Autowired
    private IPrioridadService iPrioridadService;

    @GetMapping("/listar")
    public List<Prioridad> listarPrioridad() {
        List<Prioridad> prioridad = iPrioridadService.listarPrioridad();
        return prioridad;
    }

    @PostMapping("/crear")
    public int crearPrioridad(@RequestBody Prioridad prioridad) {
        int newPrioridad = iPrioridadService.savePrioridad(prioridad);
        return newPrioridad;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarPrioridad(@PathVariable int id) {
        iPrioridadService.deletePrioridad(id);
        return ResponseEntity.ok("Prioridad eliminada exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarPrioridad(@PathVariable int id, @RequestBody Prioridad prioridad) {
        Optional<Prioridad> existingPrioridad = iPrioridadService.listIdPrioridad(id);

        if (existingPrioridad.isPresent()) {
            Prioridad updatedPrioridad = existingPrioridad.get();
            updatedPrioridad.setNombre(prioridad.getNombre());
            updatedPrioridad.setColor(prioridad.getColor());

            iPrioridadService.savePrioridad(updatedPrioridad);
            return ResponseEntity.ok("Prioridad actualizada exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
