package teamjobapptracker.jobapplicationtrackerbackend.service;

import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;

import java.util.List;

public interface JobApplicationService {
    // Create a new job application
    JobApplicationDTO createApplication(JobApplicationDTO applicationDTO);
    
    // Get a specific application by ID
    JobApplicationDTO getApplicationById(Long id, Long userId);
    
    // Get all applications for the current user
    List<JobApplicationDTO> getAllApplicationsForUser(Long userId);
    
    // Get applications for a user filtered by status
    List<JobApplicationDTO> getApplicationsByStatus(Long userId, String status);

    // Get applications based on search string
    List<JobApplicationDTO> getApplicationsBySearch(Long userId, String search);
    
    // Update an existing application
    JobApplicationDTO updateApplication(Long id, JobApplicationDTO applicationDTO, Long userId);
    
    // Update just the status of an application
    JobApplicationDTO updateApplicationStatus(Long id, String status, Long userId);
    
    // Delete an application
    JobApplicationDTO deleteApplication(Long id, Long userId);
} 