package com.example.badminton.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.entity.Event;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Role;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findAllByPartnerUid(Long uid);
}
