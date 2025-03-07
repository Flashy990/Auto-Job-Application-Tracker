package teamjobapptracker.jobapplicationtrackerbackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

  @GetMapping("/api/test/{rId}")
  public String getString(@PathVariable int rId) {
    return "Hello World" + rId;
  }

}
