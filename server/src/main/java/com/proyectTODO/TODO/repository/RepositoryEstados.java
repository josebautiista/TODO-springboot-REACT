package com.proyectTODO.TODO.repository;

import com.proyectTODO.TODO.model.Estados;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryEstados extends JpaRepository<Estados, Integer> {
}
