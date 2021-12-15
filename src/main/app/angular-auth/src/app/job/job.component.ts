import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job } from './job';
import { JobService } from './job.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: Job[];
  editJob: Job;
  deleteJob: Job;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
      this.getJobs();
  }

  public getJobs(): void {
    this.jobService.getJobs().subscribe(
      (res: Job[]) => {
        this.jobs = res;
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }

  public onOpenModal(job: any, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addJobModal');
    }
    else if(mode === 'edit'){
      this.editJob = job;
      button.setAttribute('data-target', '#updateJobModal');
    }
    else if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteJobModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddJob(addForm: NgForm): void{
    document.getElementById('add-job-form')?.click();
    this.jobService.addJob(addForm.value).subscribe(
      (res: Job) => {
        console.log(res);
        this.getJobs();
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }

  public onUpdateJob(job: Job): void{
    this.jobService.updateJob(job).subscribe(
      (res: Job) => {
        console.log(res);
        this.getJobs();
      },
      (err: HttpErrorResponse) => {
        alert("No permission");
      }
    );
  }

  public onDeleteJob(): void{

  }
}
