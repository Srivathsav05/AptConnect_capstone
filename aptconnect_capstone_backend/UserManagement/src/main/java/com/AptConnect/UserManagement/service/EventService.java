package com.AptConnect.UserManagement.service;


import com.AptConnect.UserManagement.controller.ICSFileGenerator;
import com.AptConnect.UserManagement.exception.EventNotPresentException;
import com.AptConnect.UserManagement.model.Event;
import com.AptConnect.UserManagement.model.User;
import com.AptConnect.UserManagement.repository.EventRepository;
import com.AptConnect.UserManagement.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender mailSender;
//    @Autowired
//    private PlivoService plivoService;

    public EventService() {
    }

    public Event createEvent(Event event) {
        Event savedEvent = (Event)this.eventRepository.save(event);
        List<User> users = this.userRepository.findAll();
        Iterator var4 = users.iterator();

        while(var4.hasNext()) {
            User user = (User)var4.next();

            try {
                this.sendEventEmail(user, savedEvent);
            } catch (IOException | MessagingException var7) {
                Exception e = var7;
                PrintStream var10000 = System.err;
                String var10001 = user.getEmail();
                var10000.println("Failed to send email to: " + var10001 + "due to error:" + e.getMessage());
                e.printStackTrace();
            }
        }

        return savedEvent;
    }

    private void sendEventEmail(User user, Event event) throws MessagingException, IOException {
        MimeMessage mimeMessage = this.mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(user.getEmail());
        helper.setSubject("New Event: " + event.getTitle());
        String icsContent = ICSFileGenerator.generateICSContent(event);
        InputStream is = new ByteArrayInputStream(icsContent.getBytes());
        helper.addAttachment("event.ics", new ByteArrayResource(is.readAllBytes()));
        String var10000 = user.getUsername();
        String emailBody = "Hello " + var10000 + ",\n\nA new event has been created.\n\nEvent Details:\nTitle: " + event.getTitle() + "\nDescription: " + event.getDescription() + "\nLocation: " + event.getLocation() + "\nDate: " + String.valueOf(event.getEventDate()) + "\n\nHope to see you there!\n";
        helper.setText(emailBody);
        this.mailSender.send(mimeMessage);
        System.out.println("Email sent to: " + user.getEmail());
    }

//    private void sendEventSMS(User user, Event event) {
//        String var10000 = event.getTitle();
//        String smsBody = "New Event: " + var10000 + "\nDate: " + String.valueOf(event.getEventDate()) + "\nLocation: " + event.getLocation() + "\n";
//        this.plivoService.sendSMS(user.getPhoneNumber(), smsBody);
//    }

    public List<Event> getAllEvents() {
        return this.eventRepository.findAll();
    }

    public Event updateEvent(Long id, Event event) {
        Optional<Event> existingEvent = this.eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            ((Event)existingEvent.get()).setTitle(event.getTitle());
            ((Event)existingEvent.get()).setDescription(event.getDescription());
            ((Event)existingEvent.get()).setLocation(event.getLocation());
            ((Event)existingEvent.get()).setEventDate(event.getEventDate());
            return (Event)this.eventRepository.save((Event)existingEvent.get());
        } else {
            throw new EventNotPresentException("Event not found with id: " + id);
        }
    }
    public List<Event> getEventsForUser(String username) {
        // Assuming there's a method in your repository to find events by username
        return eventRepository.findByUser_Username(username);
    }

    public void deleteEvent(Long id) {
        this.eventRepository.deleteById(id);
    }
}
