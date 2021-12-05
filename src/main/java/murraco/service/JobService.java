package murraco.service;

import murraco.exception.JobNotFoundException;
import murraco.model.Job;
import murraco.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) { this.jobRepository = jobRepository; }

    public Job addJob(Job job) { return jobRepository.save(job); }

    public List<Job> findAllJobs() { return jobRepository.findAll(); }

    public Job updateJob(Job job) { return jobRepository.save(job); }

    public Job findJobById(Long id) {
        return jobRepository.findJobById(id).orElseThrow(() -> new JobNotFoundException("Job by id " + id + "was not found."));
    }

    public void deleteJob(Long id) { jobRepository.deleteJobById(id); }
}
