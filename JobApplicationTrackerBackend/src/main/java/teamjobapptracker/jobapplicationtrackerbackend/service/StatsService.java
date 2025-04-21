package teamjobapptracker.jobapplicationtrackerbackend.service;

import teamjobapptracker.jobapplicationtrackerbackend.dto.StatsDTO;

public interface StatsService {

    public StatsDTO getUserStats(Long userId);
    public StatsDTO getGlobalStats();
    // public StatsDTO getBestStats();


}