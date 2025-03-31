package teamjobapptracker.jobapplicationtrackerbackend.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class NotificationDTO {

    // Getters and Setters
    private Long id;
    private Long userId;  // User ID to reference the user without sending the entire user object

    @NotNull
    @FutureOrPresent(message = "Notification time must be in the present or future.")
    private LocalDateTime notificationTime;
    private String message;

}
