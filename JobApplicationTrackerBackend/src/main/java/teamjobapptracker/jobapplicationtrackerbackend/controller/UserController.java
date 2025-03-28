package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import teamjobapptracker.jobapplicationtrackerbackend.dto.UserDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/users")
// For testing and development only
// For production, maybe I should configure it globally in your WebMvcConfigurer
// @CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users - Get all users
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // GET /api/users/{id} - Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // GET /api/users/email/{email} - Get user by email
    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    // POST /api/users - Create a new user
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    // PUT /api/users/{id} - Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }

    // DELETE /api/users/{id} - Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}