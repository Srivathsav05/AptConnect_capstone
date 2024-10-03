package com.AptConnect.UserManagement.controller;

import com.AptConnect.UserManagement.model.Event;
import com.AptConnect.UserManagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@RequestMapping("/events") // Change the base mapping to handle user events as well
@CrossOrigin({"http://localhost:4200"})
public class EventController {
    @Autowired
    private EventService eventService;

    // Endpoint for admins to create events
    @PostMapping("/admin/create")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        Event createdEvent = eventService.createEvent(event);
        return ResponseEntity.ok(createdEvent);
    }

    // Endpoint for admins to get all events
    @GetMapping("/admin/all")
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }

    // Endpoint for admins to update an event
    @PutMapping("/admin/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        Event updatedEvent = eventService.updateEvent(id, event);
        return ResponseEntity.ok(updatedEvent);
    }

    // Endpoint for admins to delete an event
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint for regular users to fetch all events
    @GetMapping("/all") // Public endpoint for all users
    public ResponseEntity<List<Event>> getAllUserEvents() {
        List<Event> events = eventService.getAllEvents(); // Or another method to filter events for users
        return ResponseEntity.ok(events);
    }

    // Endpoint for authenticated users to fetch their events
    @GetMapping("/user")
    public ResponseEntity<List<Event>> getUserEvents(Principal principal) {
        // Fetch events for the authenticated user
        List<Event> events = eventService.getEventsForUser(principal.getName());
        return ResponseEntity.ok(events);
    }
}
