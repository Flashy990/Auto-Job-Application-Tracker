package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamjobapptracker.jobapplicationtrackerbackend.dto.UserDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/user/profile")
// For testing and development only
// For production, I should configure it globally in your WebMvcConfigurer
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users - Get all users
    // NOT ALLOWED FOR USER. MIGRATE TO ADMIN CONTROLLER IF NEEDED
    // @GetMapping
    // public ResponseEntity<List<UserDTO>> getAllUsers() {
    //     Long userId = getAuthenticatedUserId();
    //     return ResponseEntity.ok(userService.getAllUsers());
    // }

    // GET /api/user/profile - Get user by ID
    @GetMapping
    public ResponseEntity<UserDTO> getUserById() {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    // GET /api/users/email/{email} - Get user by email
    // NOT ALLOWED FOR USER. MIGRATE TO ADMIN CONTROLLER IF NEEDED
    // @GetMapping("/email/{email}")
    // public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
    //     return ResponseEntity.ok(userService.getUserByEmail(email));
    // }

    // POST /api/users - Create a new user
    // NOT ALLOWED FOR USER. MIGRATE TO ADMIN CONTROLLER IF NEEDED
    // @PostMapping
    // public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
    //     UserDTO createdUser = userService.createUser(userDTO);
    //     return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    // }

    // PUT /api/user/profile - Update an existing user
    @PutMapping()
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO) {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(userService.updateUser(userId, userDTO));
    }

    // DELETE /api/user/profile - Delete a user
    @DeleteMapping()
    public ResponseEntity<Void> deleteUser() {
        Long userId = getAuthenticatedUserId();
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    // Helper method to get the authenticated user's ID
    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return userService.getUserByEmail(userEmail).getId();
    }
}