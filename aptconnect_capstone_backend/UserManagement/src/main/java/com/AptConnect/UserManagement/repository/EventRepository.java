package com.AptConnect.UserManagement.repository;


import com.AptConnect.UserManagement.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByUser_Username(String username);

}

