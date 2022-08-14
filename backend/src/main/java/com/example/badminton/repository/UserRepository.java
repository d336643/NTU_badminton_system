package com.example.badminton.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findBySid(String sid);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    Boolean existsBySid(String sid);
    Boolean existsByEmail(String email);
}
