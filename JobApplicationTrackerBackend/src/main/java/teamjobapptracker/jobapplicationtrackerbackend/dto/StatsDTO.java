package teamjobapptracker.jobapplicationtrackerbackend.dto;

import lombok.Data;

@Data
public class StatsDTO {
    private int totalApplications;
    private int totalInterviews;
    private int totalOffers;
    private int totalRejections;
    private int totalApplied;

    public StatsDTO(int totalApplications, int totalInterviews, int totalOffers, int totalRejections, int totalApplied) {
        this.totalApplications = totalApplications;
        this.totalInterviews = totalInterviews;
        this.totalOffers = totalOffers;
        this.totalRejections = totalRejections;
        this.totalApplied = totalApplied;
    }
}
