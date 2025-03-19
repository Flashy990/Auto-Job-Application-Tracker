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
import teamjobapptracker.jobapplicationtrackerbackend.dto.UserDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    private UserDTO testUserDTO;
    private User savedUser;

    @BeforeEach
    public void setup() {
        // Clear the database before each test
        userRepository.deleteAll();

        // Create a test user
        User testUser = new User();
        testUser.setEmail("test@example.com");
        testUser.setPassword("password123");
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setRole("USER");

        // Save the user to the database
        savedUser = userRepository.save(testUser);

        // Create a test UserDTO for API requests
        testUserDTO = new UserDTO();
        testUserDTO.setEmail("newuser@example.com");
        testUserDTO.setPassword("newpassword123");
        testUserDTO.setFirstName("New");
        testUserDTO.setLastName("User");
        testUserDTO.setRole("USER");
    }

    @Test
    public void testGetAllUsers() {
        // Send GET request to /api/users
        ResponseEntity<UserDTO[]> response = restTemplate.getForEntity("/api/users", UserDTO[].class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains at least one user
        UserDTO[] users = response.getBody();
        assertNotNull(users);
        assertTrue(users.length > 0);
    }

    @Test
    public void testGetUserById() {
        // Send GET request to /api/users/{id}
        ResponseEntity<UserDTO> response = restTemplate.getForEntity("/api/users/" + savedUser.getId(), UserDTO.class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the correct user
        UserDTO user = response.getBody();
        assertNotNull(user);
        assertEquals(savedUser.getId(), user.getId());
        assertEquals(savedUser.getEmail(), user.getEmail());
        assertEquals(savedUser.getFirstName(), user.getFirstName());
        assertEquals(savedUser.getLastName(), user.getLastName());
    }

    @Test
    public void testCreateUser() {
        // Send POST request to /api/users
        ResponseEntity<UserDTO> response = restTemplate.postForEntity("/api/users", testUserDTO, UserDTO.class);

        // Assert that the response status is 201 CREATED
        assertEquals(HttpStatus.CREATED, response.getStatusCode());

        // Assert that the response body contains the created user
        UserDTO createdUser = response.getBody();
        assertNotNull(createdUser);
        assertNotNull(createdUser.getId());
        assertEquals(testUserDTO.getEmail(), createdUser.getEmail());
        assertEquals(testUserDTO.getFirstName(), createdUser.getFirstName());
        assertEquals(testUserDTO.getLastName(), createdUser.getLastName());
    }

    @Test
    public void testUpdateUser() {
        // Update the test user
        testUserDTO.setId(savedUser.getId());
        testUserDTO.setFirstName("Updated");
        testUserDTO.setLastName("Name");

        // Send PUT request to /api/users/{id}
        HttpEntity<UserDTO> requestEntity = new HttpEntity<>(testUserDTO);
        ResponseEntity<UserDTO> response = restTemplate.exchange(
                "/api/users/" + savedUser.getId(),
                HttpMethod.PUT,
                requestEntity,
                UserDTO.class);

        // Assert that the response status is 200 OK
        assertEquals(HttpStatus.OK, response.getStatusCode());

        // Assert that the response body contains the updated user
        UserDTO updatedUser = response.getBody();
        assertNotNull(updatedUser);
        assertEquals(savedUser.getId(), updatedUser.getId());
        assertEquals(testUserDTO.getFirstName(), updatedUser.getFirstName());
        assertEquals(testUserDTO.getLastName(), updatedUser.getLastName());
    }

    @Test
    public void testDeleteUser() {
        // Send DELETE request to /api/users/{id}
        restTemplate.delete("/api/users/" + savedUser.getId());

        // Verify that the user has been deleted
        assertFalse(userRepository.existsById(savedUser.getId()));
    }

    @Test
    public void testGetUserByIdNotFound() {
        // Send GET request to /api/users/{id} with a non-existent ID
        ResponseEntity<Object> response = restTemplate.getForEntity("/api/users/999", Object.class);

        // Assert that the response status is 404 NOT FOUND
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }
} 