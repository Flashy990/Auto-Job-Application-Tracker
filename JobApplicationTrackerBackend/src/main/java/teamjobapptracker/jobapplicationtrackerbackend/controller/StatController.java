package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import teamjobapptracker.jobapplicationtrackerbackend.dto.StatsDTO;
import teamjobapptracker.jobapplicationtrackerbackend.service.JobApplicationService;
import teamjobapptracker.jobapplicationtrackerbackend.service.StatsService;
import teamjobapptracker.jobapplicationtrackerbackend.service.UserService;

@RequestMapping("/api/stats")
@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class StatController {

    private final UserService userService;
    private final StatsService statsService;
    
    @Autowired
    public StatController(UserService userService, StatsService statsService) {
        this.userService = userService;
        this.statsService = statsService;
    }

    // GET /api/stats - Get current user statistics with ownership check
    @GetMapping()
    public ResponseEntity<StatsDTO> getStats() {
        Long userId = getAuthenticatedUserId();
        return ResponseEntity.ok(statsService.getUserStats(userId));
    }

    // GET /api/stats/global - Get global (all user) statistics
    @GetMapping("/global")
    public ResponseEntity<StatsDTO> getGlobalStats() {
        return ResponseEntity.ok(statsService.getGlobalStats());
    }

    // Helper method to get the authenticated user's ID
    private Long getAuthenticatedUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();
        return userService.getUserByEmail(userEmail).getId();
    }
}
