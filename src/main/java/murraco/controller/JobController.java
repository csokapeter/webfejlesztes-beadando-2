package murraco.controller;

import murraco.model.Job;
import murraco.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/job")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    public ResponseEntity<List<Job>> getAllJobs() {
        List<Job> tasks = jobService.findAllJobs();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_CLIENT')")
    @GetMapping("/find/{id}")
    public ResponseEntity<Job> getTaskById(@PathVariable("id") Long id) {
        Job job = jobService.findJobById(id);
        return new ResponseEntity<>(job, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        Job newJob = jobService.addJob(job);
        return new ResponseEntity<>(newJob, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update")
    public  ResponseEntity<Job> updateJob(@RequestBody Job job) {
        Job updateJob = jobService.updateJob(job);
        return new ResponseEntity<>(updateJob, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity<?> deleteJob(@PathVariable("id") Long id) {
        jobService.deleteJob(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
