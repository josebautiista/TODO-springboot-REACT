package com.proyectTODO.TODO.controller;

import com.proyectTODO.TODO.interfaceService.IEstadosServices;
import com.proyectTODO.TODO.model.Estados;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/estado")
public class ControllerEstados {

    @Autowired
    private IEstadosServices iEstadosServices;

    @GetMapping("/listar")
    public List<Estados> listarEstados(){
        List<Estados> estados = iEstadosServices.listarEstados();
        return estados;
    }

    @PostMapping("/crear")
    public int crearEstado(@RequestBody Estados estado) {
        int newEstado = iEstadosServices.saveEstados(estado);
        return newEstado;
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarEstado(@PathVariable int id) {
        iEstadosServices.deleteEstados(id);
        return ResponseEntity.ok("Estado eliminado exitosamente");
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<String> actualizarEstado(@PathVariable int id, @RequestBody Estados estado) {
        Optional<Estados> existingEstado = iEstadosServices.listIdEstados(id);

        if (existingEstado.isPresent()) {
            Estados updatedEstado = existingEstado.get();
            updatedEstado.setNombre(estado.getNombre());
            updatedEstado.setColor(estado.getColor());

            iEstadosServices.saveEstados(updatedEstado); // Guarda el estado actualizado en la base de datos
            return ResponseEntity.ok("Estado actualizado exitosamente");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}
