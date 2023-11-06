package com.proyectTODO.TODO.services;

import com.proyectTODO.TODO.interfaceService.ITODOService;
import com.proyectTODO.TODO.model.TODO;
import com.proyectTODO.TODO.repository.RepositoryTODO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceTODO implements ITODOService {

    @Autowired
    private RepositoryTODO repositoryTODO;

    @Override
    public List<TODO> listarTask(){return (List<TODO>) repositoryTODO.findAll();}

    @Override
    public Optional<TODO> listIdTask(int id){ return repositoryTODO.findById(id);}

    @Override
    public int saveTask(TODO task) {
        int res = 0;
        TODO todo = repositoryTODO.save(task);
        if (todo != null) {
            res = 1;
        }
        return res;
    }


    @Override
    public void deleteTask(int id){repositoryTODO.deleteById(id);}
}
