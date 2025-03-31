package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamjobapptracker.jobapplicationtrackerbackend.model.Notification;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findByUserIdOrderByNotificationTimeDesc(Long userId);  // Example custom query
}