package teamjobapptracker.jobapplicationtrackerbackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamjobapptracker.jobapplicationtrackerbackend.dto.NotificationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.Notification;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.NotificationRepository;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;
import teamjobapptracker.jobapplicationtrackerbackend.service.NotificationService;
import teamjobapptracker.jobapplicationtrackerbackend.exception.ResourceNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public NotificationDTO createNotification(Long userId, LocalDateTime notificationTime, String message) {
        // Validate notification time (cannot be in the past)
        if (notificationTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Notification time cannot be in the past.");
        }

        // Find user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // Create notification
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setNotificationTime(notificationTime);
        notification.setMessage(message);

        // Save to database
        Notification savedNotification = notificationRepository.save(notification);

        // Return NotificationDTO
        return convertToDTO(savedNotification);
    }

    @Override
    public NotificationDTO editNotification(Long notificationId, LocalDateTime newNotificationTime, String newMessage) {
        // Find the existing notification
        Notification existingNotification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

        // Validate the new notification time (it cannot be in the past)
        if (newNotificationTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Notification time cannot be in the past.");
        }

        // Update the notification details
        existingNotification.setNotificationTime(newNotificationTime);
        existingNotification.setMessage(newMessage);

        // Save to database
        Notification updatedNotification = notificationRepository.save(existingNotification);

        // Return NotificationDTO
        return convertToDTO(updatedNotification);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        // Find the notification to delete
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification", "id", notificationId));

        // Delete the notification
        notificationRepository.delete(notification);
    }

    @Override
    public List<NotificationDTO> getNotificationsByUserId(Long userId) {
        List<Notification> notifications = notificationRepository.findByUserIdOrderByNotificationTimeDesc(userId);
        return notifications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Convert Notification entity to NotificationDTO
    private NotificationDTO convertToDTO(Notification notification) {
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setId(notification.getId());
        notificationDTO.setUserId(notification.getUser().getId());  // Only send user ID, not the entire user object
        notificationDTO.setNotificationTime(notification.getNotificationTime());
        notificationDTO.setMessage(notification.getMessage());
        return notificationDTO;
    }

    // Convert NotificationDTO to Notification entity
    private Notification convertToEntity(NotificationDTO notificationDTO) {
        Notification notification = new Notification();
        notification.setId(notificationDTO.getId());

        // Find user by userId (for creating new notifications)
        User user = userRepository.findById(notificationDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", notificationDTO.getUserId()));
        notification.setUser(user);

        notification.setNotificationTime(notificationDTO.getNotificationTime());
        notification.setMessage(notificationDTO.getMessage());

        return notification;
    }
}