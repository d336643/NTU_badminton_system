package com.example.badminton.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder.In;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Round;

@Repository
public interface RoundRepository extends JpaRepository<Round, Long> {
    List<Round> findAllByTypeIdAndSemester(Integer typeId, String semester);
    Optional<Round> findByTypeIdAndTypeIndexAndSemester(Integer typeId, Integer typeIndex, String semester);
}
