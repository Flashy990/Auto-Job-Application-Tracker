package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import teamjobapptracker.jobapplicationtrackerbackend.dto.JobApplicationDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.JobApplicationRepository;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JobApplicationControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    private User testUser;
    private JobApplication testJobApplication;
    private JobApplicationDTO testJobApplicationDTO;

    @BeforeEach
    public void setup() {
        // Clear the database before each test
        jobApplicationRepository.deleteAll();
        userRepository.deleteAll();

        // Create a test user
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password123");
        user.setFirstName("Test");
        user.setLastName("User");
        user.setRole("USER");

        // Save the user to the database
        testUser = userRepository.save(user);

        // Create a test job application
        JobApplication jobApplication = new JobApplication();
        jobApplication.setUser(testUser);
        jobApplication.setCompanyName("Test Company");
        jobApplication.setPosition("Test Position");
        jobApplication.setJobDescription("Test Description");
        jobApplication.setApplicationUrl("http://example.com");
        jobApplication.setStatus("APPLIED");
        jobApplication.setApplicationDate(LocalDate.now());
        jobApplication.setLocation("Test Location");
        jobApplication.setSalary(new BigDecimal("50000.00"));
        jobApplication.setContactName("Test Contact");
        jobApplication.setContactEmail("contact@example.com");

        // Save the job application to the database
        testJobApplication = jobApplicationRepository.save(jobApplication);

        // Create a test JobApplicationDTO for API requests
        testJobApplicationDTO = new JobApplicationDTO();
        testJobApplicationDTO.setUserId(testUser.getId());
        testJobApplicationDTO.setCompanyName("New Company");
        testJobApplicationDTO.setPosition("New Position");
        testJobApplicationDTO.setJobDescription("New Description");
        testJobApplicationDTO.setApplicationUrl("http://new-example.com");
        testJobApplicationDTO.setStatus("INTERVIEWING");
        testJobApplicationDTO.setApplicationDate(LocalDate.now());
        testJobApplicationDTO.setLocation("New Location");
        testJobApplicationDTO.setSalary(new BigDecimal("60000.00"));
        testJobApplicationDTO.setContactName("New Contact");
        testJobApplicationDTO.setContactEmail("new-contact@example.com");
    }

    @Test
    public void testGetAllApplicationsForUser() {
        // Send GET request to /api/applications/user/{userId}
        ResponseEntity<JobApplicationDTO[]> response = restTemplate.getForEntity(
                "/api/applications/user/" + testUser.getId(),
                JobApplicationDTO[].class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains at least one application
        JobApplicationDTO[] applications = response.getBody();
        assertNotNull(applications);
        assertTrue(applications.length > 0);
    }

    @Test
    public void testGetApplicationById() {
        // Send GET request to /api/applications/{id}
        ResponseEntity<JobApplicationDTO> response = restTemplate.getForEntity(
                "/api/applications/" + testJobApplication.getId(),
                JobApplicationDTO.class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the correct application
        JobApplicationDTO application = response.getBody();
        assertNotNull(application);
        assertEquals(testJobApplication.getId(), application.getId());
        assertEquals(testJobApplication.getCompanyName(), application.getCompanyName());
        assertEquals(testJobApplication.getPosition(), application.getPosition());
    }

    @Test
    public void testCreateApplication() {
        // Send POST request to /api/applications
        ResponseEntity<JobApplicationDTO> response = restTemplate.postForEntity(
                "/api/applications",
                testJobApplicationDTO,
                JobApplicationDTO.class);

        // Assert that the response status is 201 CREATED
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Assert that the response body contains the created application
        JobApplicationDTO createdApplication = response.getBody();
        assertNotNull(createdApplication);
        assertNotNull(createdApplication.getId());
        assertEquals(testJobApplicationDTO.getCompanyName(), createdApplication.getCompanyName());
        assertEquals(testJobApplicationDTO.getPosition(), createdApplication.getPosition());
    }

    @Test
    public void testUpdateApplication() {
        // Update the test application
        testJobApplicationDTO.setId(testJobApplication.getId());
        testJobApplicationDTO.setCompanyName("Updated Company");
        testJobApplicationDTO.setPosition("Updated Position");

        // Send PUT request to /api/applications/{id}
        HttpEntity<JobApplicationDTO> requestEntity = new HttpEntity<>(testJobApplicationDTO);
        ResponseEntity<JobApplicationDTO> response = restTemplate.exchange(
                "/api/applications/" + testJobApplication.getId(),
                HttpMethod.PUT,
                requestEntity,
                JobApplicationDTO.class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the updated application
        JobApplicationDTO updatedApplication = response.getBody();
        assertNotNull(updatedApplication);
        assertEquals(testJobApplication.getId(), updatedApplication.getId());
        assertEquals(testJobApplicationDTO.getCompanyName(), updatedApplication.getCompanyName());
        assertEquals(testJobApplicationDTO.getPosition(), updatedApplication.getPosition());
    }

    @Test
    public void testUpdateApplicationStatus() {
        // Create a status update request
        Map<String, String> statusUpdate = new HashMap<>();
        statusUpdate.put("status", "OFFERED");

        // Send PATCH request to /api/applications/{id}/status
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(statusUpdate);
        ResponseEntity<JobApplicationDTO> response = restTemplate.exchange(
                "/api/applications/" + testJobApplication.getId() + "/status",
                HttpMethod.PATCH,
                requestEntity,
                JobApplicationDTO.class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the updated application with the new status
        JobApplicationDTO updatedApplication = response.getBody();
        assertNotNull(updatedApplication);
        assertEquals(testJobApplication.getId(), updatedApplication.getId());
        assertEquals("OFFERED", updatedApplication.getStatus());
    }

    @Test
    public void testDeleteApplication() {
        // Send DELETE request to /api/applications/{id}
        restTemplate.delete("/api/applications/" + testJobApplication.getId());

        // Verify that the application has been deleted
        assertFalse(jobApplicationRepository.existsById(testJobApplication.getId()));
    }

    @Test
    public void testGetApplicationByIdNotFound() {
        // Send GET request to /api/applications/{id} with a non-existent ID
        ResponseEntity<Object> response = restTemplate.getForEntity("/api/applications/999", Object.class);

        // Assert that the response status is 404 NOT FOUND
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
} 