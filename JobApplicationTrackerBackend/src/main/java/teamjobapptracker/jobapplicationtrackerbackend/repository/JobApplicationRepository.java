package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUser(User user);
    List<JobApplication> findByUserAndStatus(User user, String status);
} 