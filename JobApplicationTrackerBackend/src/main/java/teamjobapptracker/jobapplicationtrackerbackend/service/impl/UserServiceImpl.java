package teamjobapptracker.jobapplicationtrackerbackend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import teamjobapptracker.jobapplicationtrackerbackend.dto.UserDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;
import teamjobapptracker.jobapplicationtrackerbackend.exception.ResourceNotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDTO createUser(UserDTO userDTO) {
        // Check if email already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        User user = convertToEntity(userDTO);
        
        // Set default role if none provided
        if (user.getRoles().isEmpty()) {
            Set<String> defaultRoles = new HashSet<>();
            defaultRoles.add("USER");
            user.setRoles(defaultRoles);
        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return convertToDTO(user);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        return convertToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        
        // Update user fields
        existingUser.setEmail(userDTO.getEmail());
        existingUser.setFirstName(userDTO.getFirstName());
        existingUser.setLastName(userDTO.getLastName());
        
        // Only update password if provided
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        // Update new profile fields if provided
        if (userDTO.getAvatarUrl() != null) {
            existingUser.setAvatarUrl(userDTO.getAvatarUrl());
        }
        if (userDTO.getGender() != null) {
            existingUser.setGender(userDTO.getGender());
        }
        if (userDTO.getDob() != null) {
            existingUser.setDob(userDTO.getDob());
        }
        if (userDTO.getEducation() != null) {
            existingUser.setEducation(userDTO.getEducation());
        }
        if (userDTO.getIndustry() != null) {
            existingUser.setIndustry(userDTO.getIndustry());
        }
        
        User updatedUser = userRepository.save(existingUser);
        return convertToDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User", "id", id);
        }
        userRepository.deleteById(id);
    }

    // Helper methods to convert between DTO and Entity
    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());

        // New fields for profile page
        userDTO.setAvatarUrl(user.getAvatarUrl());
        userDTO.setGender(user.getGender());
        userDTO.setDob(user.getDob());
        userDTO.setEducation(user.getEducation());
        userDTO.setIndustry(user.getIndustry());

        // Do not password in DTO for security reasons
        return userDTO;
    }

    private User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());

        // New fields for profile page
        user.setAvatarUrl(userDTO.getAvatarUrl());
        user.setGender(userDTO.getGender());
        user.setDob(userDTO.getDob());
        user.setEducation(userDTO.getEducation());
        user.setIndustry(userDTO.getIndustry());

        // Initialize empty set of roles
        user.setRoles(new HashSet<>());
        return user;
    }
} 