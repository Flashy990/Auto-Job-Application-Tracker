package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.JobApplicationService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
// For testing and development only
// For production, maybe I should configure it globally in your WebMvcConfigurer
@CrossOrigin(origins = "*")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @Autowired
    public JobApplicationController(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    // GET /api/applications/user/{userId} - Get all applications for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobApplicationDTO>> getAllApplicationsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(jobApplicationService.getAllApplicationsForUser(userId));
    }

    // GET /api/applications/user/{userId}/status/{status} - Get applications by status
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<JobApplicationDTO>> getApplicationsByStatus(
            @PathVariable Long userId, 
            @PathVariable String status) {
        return ResponseEntity.ok(jobApplicationService.getApplicationsByStatus(userId, status));
    }

    // GET /api/applications/{id} - Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> getApplicationById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getApplicationById(id));
    }

    // POST /api/applications - Create a new application
    @PostMapping
    public ResponseEntity<JobApplicationDTO> createApplication(@RequestBody JobApplicationDTO applicationDTO) {
        JobApplicationDTO createdApplication = jobApplicationService.createApplication(applicationDTO);
        return new ResponseEntity<>(createdApplication, HttpStatus.CREATED);
    }

    // PUT /api/applications/{id} - Update an existing application
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationDTO> updateApplication(
            @PathVariable Long id, 
            @RequestBody JobApplicationDTO applicationDTO) {
        return ResponseEntity.ok(jobApplicationService.updateApplication(id, applicationDTO));
    }

    // PATCH /api/applications/{id}/status - Update application status
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationDTO> updateApplicationStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        String status = statusUpdate.get("status");
        if (status == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(jobApplicationService.updateApplicationStatus(id, status));
    }

    // DELETE /api/applications/{id} - Delete an application
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        jobApplicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }
} 