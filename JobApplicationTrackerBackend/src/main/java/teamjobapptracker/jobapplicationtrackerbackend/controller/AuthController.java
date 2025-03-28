package teamjobapptracker.jobapplicationtrackerbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamjobapptracker.jobapplicationtrackerbackend.dto.AuthRequest;
import teamjobapptracker.jobapplicationtrackerbackend.dto.AuthResponse;
import teamjobapptracker.jobapplicationtrackerbackend.dto.UserDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.security.JwtService;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserDTO userDTO) {
        // create new user
        UserDTO createdUser = userService.createUser(userDTO);
        
        // generate token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
        );
        
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(
                token,
                createdUser.getEmail(),
                createdUser.getFirstName(),
                createdUser.getLastName()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        // authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // get user details and generate token
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        // get user details for response
        UserDTO user = userService.getUserByEmail(userDetails.getUsername());

        return ResponseEntity.ok(new AuthResponse(
                token,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        ));
    }
} 