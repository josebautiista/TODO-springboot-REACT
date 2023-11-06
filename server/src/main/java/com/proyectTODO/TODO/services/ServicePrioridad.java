package com.proyectTODO.TODO.services;

import com.proyectTODO.TODO.interfaceService.IPrioridadService;
import com.proyectTODO.TODO.model.Prioridad;
import com.proyectTODO.TODO.repository.RepositoryPrioridad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicePrioridad implements IPrioridadService {

    @Autowired
    private RepositoryPrioridad repositoryPrioridad;

    @Override
    public List<Prioridad> listarPrioridad(){return (List<Prioridad>) repositoryPrioridad.findAll();}

    @Override
    public Optional<Prioridad> listIdPrioridad(int id){ return repositoryPrioridad.findById(id);}

    @Override
    public int savePrioridad(Prioridad p){
        int res =0;
        Prioridad prioridad = repositoryPrioridad.save(p);
        if(!prioridad.equals(null)){
            res = 1;
        }
        return res;
    }

    @Override
    public void deletePrioridad(int id){repositoryPrioridad.deleteById(id);}
}
