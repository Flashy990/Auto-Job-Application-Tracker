package teamjobapptracker.jobapplicationtrackerbackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
public class Notification {

    @Setter
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Setter
    @Getter
    private LocalDateTime notificationTime;  // Custom time for the notification

    @Setter
    @Getter
    private String message;  // Custom message for the notification

    private boolean sent = false;  // Whether the notification has been sent or not

    public Notification() {}

}
