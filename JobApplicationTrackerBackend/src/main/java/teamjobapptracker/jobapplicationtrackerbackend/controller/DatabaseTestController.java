package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import teamjobapptracker.jobapplicationtrackerbackend.model.TestEntity;
import teamjobapptracker.jobapplicationtrackerbackend.repository.TestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/db-test")
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class DatabaseTestController {

    @Autowired
    private TestRepository testRepository;

    @GetMapping
    public List<TestEntity> getAllEntities() {
        return testRepository.findAll();
    }

    @PostMapping
    public TestEntity createEntity() {
        TestEntity entity = new TestEntity();
        entity.setName("Test Entity " + System.currentTimeMillis());
        return testRepository.save(entity);
    }

    @DeleteMapping("/del-user/{uid}")
    public ResponseEntity<String> deleteUserById(@PathVariable Long uid) {
        if (testRepository.existsById(uid)) {
            testRepository.deleteById(uid);
            return ResponseEntity.ok("Successfully deleted user: " + uid + ".");
        }
        else {
            return ResponseEntity.status(404).body("User: " + uid + " not found.");
        }
    }
} 