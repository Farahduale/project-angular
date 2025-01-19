import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../Services/github.service';

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})

export class CommitsComponent implements OnInit {

commits: any[] = []; // Lista med commits   
constructor(private githubService: GithubService) {}

ngOnInit(): void {
    const owner = 'Farahduale';
    const repo = 'project-angular';

    this.githubService.getCommits(owner,repo).subscribe(data => {
        this.commits = data; 
    });


}


}
