package com.example.badminton.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.entity.Department;
import com.example.badminton.model.entity.Event;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
