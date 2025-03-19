package teamjobapptracker.jobapplicationtrackerbackend.service;

import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;

import java.util.List;

public interface JobApplicationService {
    // Create a new job application
    JobApplicationDTO createApplication(JobApplicationDTO applicationDTO);
    
    // Get a specific application by ID
    JobApplicationDTO getApplicationById(Long id);
    
    // Get all applications for the current user
    List<JobApplicationDTO> getAllApplicationsForUser(Long userId);
    
    // Get applications for a user filtered by status
    List<JobApplicationDTO> getApplicationsByStatus(Long userId, String status);
    
    // Update an existing application
    JobApplicationDTO updateApplication(Long id, JobApplicationDTO applicationDTO);
    
    // Update just the status of an application
    JobApplicationDTO updateApplicationStatus(Long id, String status);
    
    // Delete an application
    void deleteApplication(Long id);
} 