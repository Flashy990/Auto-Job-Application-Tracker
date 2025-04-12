package teamjobapptracker.jobapplicationtrackerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByUserIdAndStatus(Long userId, String status);
    // List<JobApplication> findByUserIdAndCompanyNameContaining(Long userId, String search);
    // @Query("SELECT j FROM JobApplication j WHERE LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
    //         " OR LOWER(j.jobDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
    //         " OR LOWER(j.contactName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(j.contactEmail) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    @Query("SELECT j FROM JobApplication j " +
    "WHERE CASE WHEN j.user.id = :userId THEN (" +
    "   LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "   LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "   LOWER(j.jobDescription) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "   LOWER(j.location) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "   LOWER(j.contactName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
    "   LOWER(j.contactEmail) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
    ") ELSE FALSE END")
    List<JobApplication> findEntryFromSubstringCustomQuery(@Param("userId") Long userId, @Param("keyword") String keyword);

} 