package teamjobapptracker.jobapplicationtrackerbackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import teamjobapptracker.jobapplicationtrackerbackend.dto.StatsDTO;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication;
import teamjobapptracker.jobapplicationtrackerbackend.model.JobApplication.ApplicationStatus;
import teamjobapptracker.jobapplicationtrackerbackend.model.User;
import teamjobapptracker.jobapplicationtrackerbackend.repository.JobApplicationRepository;
import teamjobapptracker.jobapplicationtrackerbackend.repository.UserRepository;
import teamjobapptracker.jobapplicationtrackerbackend.service.StatsService;

@Service
public class StatsServiceImpl implements StatsService{

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    @Autowired
    public StatsServiceImpl(JobApplicationRepository jobApplicationRepository, UserRepository userRepository) {
        this.jobApplicationRepository = jobApplicationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public StatsDTO getUserStats(Long userId) {
        List<JobApplication> userApplications = jobApplicationRepository.findByUserId(userId);
        int totalApplications = userApplications.size();
        int totalInterviews = 0;
        int totalOffers = 0;
        int totalRejections = 0;
        int totalApplied = 0;

        for (JobApplication application : userApplications) {
            if (application.getStatus() == ApplicationStatus.INTERVIEWING) {
                totalInterviews++;
            }
            else if (application.getStatus() == ApplicationStatus.ACCEPTED) {
                totalOffers++;
            }
            else if (application.getStatus() == ApplicationStatus.REJECTED) {
                totalRejections++;
            }
            else if (application.getStatus() == ApplicationStatus.APPLIED) {
                totalApplied++;
            }
        }
        StatsDTO userStats = new StatsDTO(totalApplications, totalInterviews, totalOffers, totalRejections, totalApplied);
        return userStats;
    }

    @Override
    public StatsDTO getGlobalStats() {
        List<JobApplication> allApplications = jobApplicationRepository.findAll();
        int totalApplications = allApplications.size();
        int totalInterviews = 0;
        int totalOffers = 0;
        int totalRejections = 0;
        int totalApplied = 0;

        for (JobApplication application : allApplications) {
            if (application.getStatus() == ApplicationStatus.INTERVIEWING) {
                totalInterviews++;
            }
            else if (application.getStatus() == ApplicationStatus.ACCEPTED) {
                totalOffers++;
            }
            else if (application.getStatus() == ApplicationStatus.REJECTED) {
                totalRejections++;
            }
            else if (application.getStatus() == ApplicationStatus.APPLIED) {
                totalApplied++;
            }
        }
        StatsDTO globalStats = new StatsDTO(totalApplications, totalInterviews, totalOffers, totalRejections, totalApplied);
        return globalStats;
    }

    // @Override
    // public StatsDTO getBestStats() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getBestStats'");
    // }

    // private StatsDTO convertToDTO()

    
}
