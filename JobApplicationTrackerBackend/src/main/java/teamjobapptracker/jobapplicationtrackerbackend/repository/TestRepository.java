package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import teamjobapptracker.jobapplicationtrackerbackend.model.TestEntity;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
} 