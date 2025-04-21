package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import teamjobapptracker.jobapplicationtrackerbackend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT COUNT(u) FROM User u")
    Long countUsers();
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
} 