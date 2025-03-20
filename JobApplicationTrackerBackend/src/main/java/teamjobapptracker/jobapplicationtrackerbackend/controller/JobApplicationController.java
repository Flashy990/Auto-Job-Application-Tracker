package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.JobApplicationService;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
// For testing and development only
// For production, maybe I should configure it globally in your WebMvcConfigurer
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final UserService userService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService, UserService userService) {
        this.jobApplicationService = jobApplicationService;
        this.userService = userService;
    }

    // GET /api/applications - Get all applications for the authenticated user
    @GetMapping
    public ResponseEntity<List<JobApplicationDTO>> getAllApplicationsForUser() {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(jobApplicationService.getAllApplicationsForUser(userId));
    }

    // GET /api/applications/status/{status} - Get applications by status for the authenticated user
    @GetMapping("/status/{status}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationsByStatus(@PathVariable String status) {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(jobApplicationService.getApplicationsByStatus(userId, status));
    }

    // GET /api/applications/{id} - Get application by ID (with ownership check)
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getApplicationById(@PathVariable Long id) {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(jobApplicationService.getApplicationById(id, userId));
    }

    // POST /api/applications - Create a new application for the authenticated user
    @PostMapping
    public ResponseEntity<JobApplicationDTO> createApplication(@RequestBody JobApplicationDTO applicationDTO) {
        Long userId = getAuthenticatedUserId();
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        System.out.println("Current Authenticated User userId: " + userId);
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        // Ensure the application is created for the authenticated user
        applicationDTO.setUserId(userId);
        
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        System.out.println("Printing applicationDTO: " + applicationDTO.toString());
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        
        JobApplicationDTO createdApplication = jobApplicationService.createApplication(applicationDTO);
        
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        System.out.println("Printing JobApplicationDTO: " + createdApplication.toString());
        System.out.println("\n\n\n\n\n\n\n\n\n\n\n");
        
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    // PUT /api/applications/{id} - Update an existing application (with ownership check)
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> updateApplication(
            @PathVariable Long id, 
            @RequestBody JobApplicationDTO applicationDTO) {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(jobApplicationService.updateApplication(id, applicationDTO, userId));
    }

    // PATCH /api/applications/{id}/status - Update application status (with ownership check)
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationDTO> updateApplicationStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(id, status, userId));
    }

    // DELETE /api/applications/{id} - Delete an application (with ownership check)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        Long userId = getAuthenticatedUserId();
        jobApplicationService.deleteApplication(id, userId);
        return ResponseEntity.noContent().build();
    }

    // Helper method to get the authenticated user's ID
    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return userService.getUserByEmail(userEmail).getId();
    }
} 