package com.proyectTODO.TODO.interfaceService;

import com.proyectTODO.TODO.model.Prioridad;

import java.util.List;
import java.util.Optional;

public interface IPrioridadService {

    public List<Prioridad> listarPrioridad();
    public Optional<Prioridad> listIdPrioridad(int id);
    public int savePrioridad (Prioridad task);
    public void deletePrioridad(int id);
}
