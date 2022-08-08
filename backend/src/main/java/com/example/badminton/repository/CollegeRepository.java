package com.example.badminton.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.entity.College;
import com.example.badminton.model.entity.Department;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
}
