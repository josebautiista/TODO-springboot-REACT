package com.proyectTODO.TODO.services;

import com.proyectTODO.TODO.interfaceService.IEstadosServices;
import com.proyectTODO.TODO.model.Estados;
import com.proyectTODO.TODO.repository.RepositoryEstados;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceEstados implements IEstadosServices {
    @Autowired
    private RepositoryEstados repositoryEstados;

    @Override
    public List<Estados> listarEstados(){return (List<Estados>) repositoryEstados.findAll();}

    @Override
    public Optional<Estados> listIdEstados(int id){ return repositoryEstados.findById(id);}

    @Override
    public int saveEstados(Estados e){
        int res =0;
        Estados estados = repositoryEstados.save(e);
        if(!estados.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public void deleteEstados(int id){repositoryEstados.deleteById(id);}

    @Override
    public boolean actualizarEstado(int id, Estados estado) {
        Optional<Estados> existingEstado = repositoryEstados.findById(id);
        if (existingEstado.isPresent()) {
            Estados updatedEstado = existingEstado.get();
            updatedEstado.setNombre(estado.getNombre());
            repositoryEstados.save(updatedEstado);
            return true;
        } else {
            return false;
        }
    }
}
