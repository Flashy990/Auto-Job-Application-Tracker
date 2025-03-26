package teamjobapptracker.jobapplicationtrackerbackend.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class JobApplicationDTO {
    private Long id;
    private Long userId;
    private String companyName;
    private String position;
    private String jobDescription;
    private String applicationUrl;
    private String status;
    private LocalDate applicationDate;
    private String location;
    private BigDecimal salary;
    private String contactName;
    private String contactEmail;
} 