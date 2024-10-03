package com.AptConnect.UserManagement.controller;

import com.AptConnect.UserManagement.model.Event;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ICSFileGenerator {
    public ICSFileGenerator() {
    }

    public static String generateICSContent(Event event) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd'T'HHmmss'Z'");

        // Convert LocalDate to LocalDateTime at start of the day
        LocalDateTime startDateTime = event.getEventDate().atStartOfDay();
        LocalDateTime endDateTime = startDateTime; // Adjust as needed for the end time

        String formattedStartDateTime = dtf.format(startDateTime);
        String formattedEndDateTime = dtf.format(endDateTime);

        Long eventId = event.getId();
        return "BEGIN:VCALENDAR\n" +
                "VERSION:2.0\n" +
                "PRODID:-//Your Company//NONSGML Event//EN\n" +
                "BEGIN:VEVENT\n" +
                "UID:" + eventId + "@yourdomain.com\n" +
                "DTSTAMP:" + formattedStartDateTime + "\n" +
                "DTSTART:" + formattedStartDateTime + "\n" +
                "DTEND:" + formattedEndDateTime + "\n" +
                "SUMMARY:" + event.getTitle() + "\n" +
                "DESCRIPTION:" + event.getDescription() + "\n" +
                "LOCATION:" + event.getLocation() + "\n" +
                "END:VEVENT\n" +
                "END:VCALENDAR";
    }
}
