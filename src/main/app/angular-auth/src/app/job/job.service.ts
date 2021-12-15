import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Job } from "./job";

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private apiServerUrl = '';

    constructor(private http: HttpClient) { }
    

    public getJobs(): Observable<Job[]> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        console.log(headers);
        return this.http.get<Job[]>(`http://localhost:8080/job/all`, {headers: headers});
    }

    public addJob(job: Job): Observable<Job> {
        return this.http.post<Job>(`http://localhost:8080/job/add`, job);
    }

    public updateJob(job: Job): Observable<Job> {
        return this.http.put<Job>(`http://localhost:8080/job/update`, job);
    }

    public deleteJob(jobId: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8080/job/delete/${jobId}`);
    }
}