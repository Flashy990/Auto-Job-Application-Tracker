package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
} 