package com.proyectTODO.TODO.repository;

import com.proyectTODO.TODO.model.TODO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryTODO extends JpaRepository<TODO, Integer> {

}
