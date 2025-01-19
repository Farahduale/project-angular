import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskComponent } from "./Tasks/task.component";
import { CommitsComponent } from "./Tasks/commits.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskComponent, CommitsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-angular';
}
