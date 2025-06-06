package teamjobapptracker.jobapplicationtrackerbackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.exception.ResourceNotFoundException;
import teamjobapptracker.jobapplicationtrackerbackend.exception.UnauthorizedAccessException;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication.ApplicationStatus;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.JobApplicationRepository;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;
import teamjobapptracker.jobapplicationtrackerbackend.service.JobApplicationService;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        // System.out.println("Printing JobApplicationDTO From JobApplicationServiceImpl: " + applicationDTO.toString());
        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        JobApplication application = convertToEntity(applicationDTO);
        JobApplication savedApplication = jobApplicationRepository.save(application);
        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        // System.out.println("Generated Id: " + savedApplication.getId());
        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        return convertToDTO(savedApplication);
    }

    @Override
    public JobApplicationDTO getApplicationById(Long id, Long userId) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));

        // Check if the application belongs to the requesting user
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You don't have permission to access this job application");
        }

        return convertToDTO(application);
    }

    @Override
    public List<JobApplicationDTO> getAllApplicationsForUser(Long userId) {
        List<JobApplication> applicationList = jobApplicationRepository.findByUserId(userId);
        if (applicationList.isEmpty()) {
            throw new ResourceNotFoundException("JobApplication", "userId", userId);
        } else {
            return applicationList.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        }
    }

    @Override
    public List<JobApplicationDTO> getApplicationsByStatus(Long userId, ApplicationStatus status) {
        return jobApplicationRepository.findByUserIdAndStatus(userId, status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    /*
     * The search string should have keywords separated by "+"
     * For example: "keyword1+keyword2+keyword3"
     * or 
     * For example: "keyword1"
     */
    @Override
    public List<JobApplicationDTO> getApplicationsBySearch(Long userId, String search) {
        // List<JobApplication> resApplications = new ArrayList<JobApplication>();

        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        // System.out.println("Search String: " + search);
        // System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        List<String> keywords = Arrays.stream(search.split("\\+"))
                              .filter(word -> !word.isEmpty()) // this will ignore empty strings
                              .toList();

        // to make a list of job applications to send as the response
        Set<JobApplication> resApplications = new HashSet<JobApplication>();

        for (String keyword : keywords) {
            resApplications.addAll(jobApplicationRepository.findEntryFromSubstringCustomQuery(userId, keyword));
        }

        return resApplications.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobApplicationDTO updateApplication(Long id, JobApplicationDTO applicationDTO, Long userId) {
        JobApplication existingApplication = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));

        // Check if the application belongs to the requesting user
        if (!existingApplication.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You don't have permission to update this job application");
        }

        // Update application fields
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

        JobApplication updatedApplication = jobApplicationRepository.save(existingApplication);
        return convertToDTO(updatedApplication);
    }

    @Override
    public JobApplicationDTO updateApplicationStatus(Long id, ApplicationStatus status, Long userId) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));

        // Check if the application belongs to the requesting user
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You don't have permission to update this job application");
        }

        application.setStatus(status);
        JobApplication updatedApplication = jobApplicationRepository.save(application);
        return convertToDTO(updatedApplication);
    }

    @Override
    public JobApplicationDTO deleteApplication(Long id, Long userId) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("JobApplication", "id", id));

        // Check if the application belongs to the requesting user
        if (!application.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You don't have permission to delete this job application");
        }

        jobApplicationRepository.deleteById(id);
        return convertToDTO(application);
    }

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
        application.setId(dto.getId());
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
        
        // Set the user relationship
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getUserId()));
            application.setUser(user);
        }
        
        return application;
    }
} 