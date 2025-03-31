package teamjobapptracker.jobapplicationtrackerbackend.service;

import teamjobapptracker.jobapplicationtrackerbackend.dto.NotificationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.Notification;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationService {
    // Method to create a notification
    NotificationDTO createNotification(Long userId, LocalDateTime notificationTime, String message);

    // Method to edit an existing notification
    NotificationDTO editNotification(Long notificationId, LocalDateTime newNotificationTime, String newMessage);

    // Method to delete a notification
    void deleteNotification(Long notificationId);

    // Method to get all notifications by user ID
    List<NotificationDTO> getNotificationsByUserId(Long userId);
}
