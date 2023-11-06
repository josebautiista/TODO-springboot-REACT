package com.proyectTODO.TODO.interfaceService;

import com.proyectTODO.TODO.model.Estados;

import java.util.List;
import java.util.Optional;

public interface IEstadosServices {

    public List<Estados> listarEstados();
    public Optional<Estados> listIdEstados(int id);
    public int saveEstados(Estados estados);
    public void deleteEstados(int id);

    boolean actualizarEstado(int id, Estados estado);
}
