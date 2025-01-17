import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({  
    providedIn: 'root'  

})  

export class GithubService {
    
    private apiUrl = 'https://api.github.com';

    constructor(private http: HttpClient) {}    
    
    getCommits(owner: string, repo: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/repos/${owner}/${repo}/commits`);
    }  
}