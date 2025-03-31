package teamjobapptracker.jobapplicationtrackerbackend.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamjobapptracker.jobapplicationtrackerbackend.dto.NotificationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.NotificationService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Create a notification
    @PostMapping
    public ResponseEntity<NotificationDTO> createNotification(@RequestParam Long userId,
                                                              @RequestParam @Valid LocalDateTime notificationTime,
                                                              @RequestParam String message) {
        NotificationDTO createdNotification = notificationService.createNotification(userId, notificationTime, message);
        return new ResponseEntity<>(createdNotification, HttpStatus.CREATED);
    }

    // Edit an existing notification
    @PutMapping("/{notificationId}")
    public ResponseEntity<NotificationDTO> editNotification(@PathVariable Long notificationId,
                                                            @RequestParam @Valid LocalDateTime notificationTime,
                                                            @RequestParam String message) {
        NotificationDTO updatedNotification = notificationService.editNotification(notificationId, notificationTime, message);
        return new ResponseEntity<>(updatedNotification, HttpStatus.OK);
    }

    // Delete a notification
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get notifications by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@PathVariable Long userId) {
        List<NotificationDTO> notifications = notificationService.getNotificationsByUserId(userId);
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }
}
