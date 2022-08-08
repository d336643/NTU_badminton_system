package com.example.badminton.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.entity.Event;
import com.example.badminton.model.entity.Role;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
