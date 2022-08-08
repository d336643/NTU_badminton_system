package com.example.badminton.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.model.entity.College;
import com.example.badminton.model.entity.Department;
import com.example.badminton.model.response.SuccessDataResponse;
import com.example.badminton.repository.CollegeRepository;
import com.example.badminton.repository.DepartmentRepository;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/public")
public class PublicController {

    private final DepartmentRepository departmentRepository;

    private final CollegeRepository collegeRepository;

    @GetMapping("/departments")
    ResponseEntity<?> getDepartments() {
        List<Department> departments = departmentRepository.findAll();
        List<College> colleges = collegeRepository.findAll();

        HashMap<String, HashMap<String, String>> data = new HashMap<String, HashMap<String, String>>();
        HashMap<String, String> collegeValues = new HashMap<String, String>();
        HashMap<String, String> departmentValues = new HashMap<String, String>();
        for (College c : colleges) {
            collegeValues.put(c.getCollegeId(), c.getName());
        }
        for (Department d : departments) {
            departmentValues.put(d.getDepartmentId(), d.getName());
        }
        data.put("colleges", collegeValues);
        data.put("departments", departmentValues);
        return ResponseEntity.ok(new SuccessDataResponse(true, data));
    }

}
