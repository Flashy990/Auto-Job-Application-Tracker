package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:3000")
public class TestController {

  @GetMapping("/api/test/{testId}")
  public String getString(@PathVariable int testId) {
    return "Hello World: " + testId;
  }
}
