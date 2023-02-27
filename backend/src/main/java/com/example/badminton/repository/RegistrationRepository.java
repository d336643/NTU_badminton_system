package com.example.badminton.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.badminton.model.entity.Registration;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findAllByPartnerUid(Long uid);

    @Query(value = "SELECT IFNULL(MAX(registration_id), 0) FROM registration WHERE event_id = :eid AND semester = :semester", nativeQuery = true)
    int findRegistrationIdsByEventIdAndSemester(@Param("eid") Long eid, @Param("semester") String semester);

    @Modifying
    @Query("DELETE FROM Registration r WHERE r.id = :id")
    void deleteById(@Param("id") Long id);

}
