package teamjobapptracker.jobapplicationtrackerbackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.JobApplicationRepository;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;
import teamjobapptracker.jobapplicationtrackerbackend.service.JobApplicationService;
import teamjobapptracker.jobapplicationtrackerbackend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    @Autowired
    public JobApplicationServiceImpl(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public JobApplicationDTO createApplication(JobApplicationDTO applicationDTO) {
        // Find the user
        User user = userRepository.findById(applicationDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", applicationDTO.getUserId()));
        
        // Convert DTO to entity
        JobApplication application = convertToEntity(applicationDTO);
        application.setUser(user);
        
        // Save the entity
        JobApplication savedApplication = jobApplicationRepository.save(application);
        
        // Return the saved entity as DTO
        return convertToDTO(savedApplication);
    }

    @Override
    public JobApplicationDTO getApplicationById(Long id) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application", "id", id));
        
        return convertToDTO(application);
    }

    @Override
    public List<JobApplicationDTO> getAllApplicationsForUser(Long userId) {
        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        // Get all applications for the user
        List<JobApplication> applications = jobApplicationRepository.findByUser(user);
        
        // Convert to DTOs
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobApplicationDTO> getApplicationsByStatus(Long userId, String status) {
        // Find the user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        // Get applications for the user with the specified status
        List<JobApplication> applications = jobApplicationRepository.findByUserAndStatus(user, status);
        
        // Convert to DTOs
        return applications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobApplicationDTO updateApplication(Long id, JobApplicationDTO applicationDTO) {
        // Find the application
        JobApplication existingApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application", "id", id));
        
        // Update fields
        existingApplication.setCompanyName(applicationDTO.getCompanyName());
        existingApplication.setPosition(applicationDTO.getPosition());
        existingApplication.setJobDescription(applicationDTO.getJobDescription());
        existingApplication.setApplicationUrl(applicationDTO.getApplicationUrl());
        existingApplication.setStatus(applicationDTO.getStatus());
        existingApplication.setApplicationDate(applicationDTO.getApplicationDate());
        existingApplication.setLocation(applicationDTO.getLocation());
        existingApplication.setSalary(applicationDTO.getSalary());
        existingApplication.setContactName(applicationDTO.getContactName());
        existingApplication.setContactEmail(applicationDTO.getContactEmail());
        
        // Save the updated application
        JobApplication updatedApplication = jobApplicationRepository.save(existingApplication);
        
        // Return the updated application as DTO
        return convertToDTO(updatedApplication);
    }

    @Override
    public JobApplicationDTO updateApplicationStatus(Long id, String status) {
        // Find the application
        JobApplication existingApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application", "id", id));
        
        // Update status
        existingApplication.setStatus(status);
        
        // Save the updated application
        JobApplication updatedApplication = jobApplicationRepository.save(existingApplication);
        
        // Return the updated application as DTO
        return convertToDTO(updatedApplication);
    }

    @Override
    public void deleteApplication(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job application", "id", id);
        }
        jobApplicationRepository.deleteById(id);
    }

    // Helper methods to convert between DTO and Entity
    private JobApplicationDTO convertToDTO(JobApplication application) {
        JobApplicationDTO dto = new JobApplicationDTO();
        dto.setId(application.getId());
        dto.setUserId(application.getUser().getId());
        dto.setCompanyName(application.getCompanyName());
        dto.setPosition(application.getPosition());
        dto.setJobDescription(application.getJobDescription());
        dto.setApplicationUrl(application.getApplicationUrl());
        dto.setStatus(application.getStatus());
        dto.setApplicationDate(application.getApplicationDate());
        dto.setLocation(application.getLocation());
        dto.setSalary(application.getSalary());
        dto.setContactName(application.getContactName());
        dto.setContactEmail(application.getContactEmail());
        return dto;
    }

    private JobApplication convertToEntity(JobApplicationDTO dto) {
        JobApplication application = new JobApplication();
        // Don't set ID for new entities
        if (dto.getId() != null) {
            application.setId(dto.getId());
        }
        // User will be set separately
        application.setCompanyName(dto.getCompanyName());
        application.setPosition(dto.getPosition());
        application.setJobDescription(dto.getJobDescription());
        application.setApplicationUrl(dto.getApplicationUrl());
        application.setStatus(dto.getStatus());
        application.setApplicationDate(dto.getApplicationDate());
        application.setLocation(dto.getLocation());
        application.setSalary(dto.getSalary());
        application.setContactName(dto.getContactName());
        application.setContactEmail(dto.getContactEmail());
        return application;
    }
} 