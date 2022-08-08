package com.example.badminton.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.badminton.model.entity.User;
import com.example.badminton.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String sid) throws UsernameNotFoundException {
        User user = userRepository.findBySid(sid)
                                  .orElseThrow(() -> new UsernameNotFoundException("User Not Found with student ID: " + sid));

        return UserDetailsImpl.build(user);
    }

}