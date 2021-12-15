import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Job } from './job';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
      this.getJobs();
  }

  public getJobs(): void {
    this.jobService.getJobs().subscribe(
      (res: Job[]) => {
        console.log(`A jobok: ${res}`);
        this.jobs = res;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

}
