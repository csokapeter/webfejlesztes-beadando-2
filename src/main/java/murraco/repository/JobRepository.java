package murraco.repository;

import murraco.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findJobById(Long id);

    @Transactional
    void deleteJobById(Long id);
}
