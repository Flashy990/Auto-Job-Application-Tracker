package teamjobapptracker.jobapplicationtrackerbackend.dto;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    
    // Password is only used for registration/updates
    private String password;

    // New fields for the profile
    private String avatarUrl;
    private String gender;
    private String dob;
    private String education;
    private String industry;
} 