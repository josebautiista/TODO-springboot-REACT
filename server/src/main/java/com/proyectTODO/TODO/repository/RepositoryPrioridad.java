package com.proyectTODO.TODO.repository;

import com.proyectTODO.TODO.model.Prioridad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryPrioridad extends JpaRepository<Prioridad, Integer> {
}
