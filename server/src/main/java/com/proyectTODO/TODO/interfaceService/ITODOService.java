package com.proyectTODO.TODO.interfaceService;

import com.proyectTODO.TODO.model.TODO;

import java.util.List;
import java.util.Optional;

public interface ITODOService {

    public List<TODO> listarTask();

    public Optional<TODO> listIdTask(int id);
    public int saveTask (TODO task);
    public void deleteTask(int id);
}
