import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Job } from "./job";

@Injectable({providedIn: 'root'})
export class JobService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }
    
    public getJobs(): Observable<Job[]> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.get<Job[]>(`${this.apiServerUrl}/job/all`, {headers: headers});
    }

    public addJob(job: Job): Observable<Job> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.post<Job>(`${this.apiServerUrl}/job/add`, job);
    }

    public updateJob(job: Job): Observable<Job> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.put<Job>(`${this.apiServerUrl}/job/update`, job);
    }

    public deleteJob(jobId: number): Observable<void> {
        const cookies = Object.fromEntries(document.cookie.split('; ').map(v=>v.split('=').map(decodeURIComponent)));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${[cookies['jwt']]}`
        });
        return this.http.delete<void>(`${this.apiServerUrl}/job/delete/${jobId}`);
    }
}