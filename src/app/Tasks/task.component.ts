import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../Services/task.service';

@Component({
    selector: "app-task",
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.css"]
})
export class TaskComponent implements OnInit {
    tasks: any[] = []; // Task-lista hämtad från backend
    newTask: string = ""; // Ny task som ska läggas till

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        // Hämta tasks från backend vid initiering
        this.taskService.getTasks().subscribe((data: any[]) => {
            this.tasks = data;
        });
    }

    addTask(): void {
        if (this.newTask.trim()) {
            const newTask = {
                name: this.newTask,
                isCompleted: false
            };

            // Skicka ny task till backend via TaskService
            this.taskService.addTask(newTask).subscribe((createdTask: any) => {
                this.tasks.push(createdTask); // Lägg till den skapade tasken i listan
                this.newTask = ""; // Töm inputfältet
            });
        }
    }

    deleteTask(task: any): void {
        // Ta bort task via backend
        this.taskService.deleteTask(task.id).subscribe(() => {
            this.tasks = this.tasks.filter((t) => t.id !== task.id); // Ta bort task från lista
        });
    }  
    
    updateTask(task: any): void {
        // Uppdatera task via backend
        this.taskService.updateTask(task.id, task).subscribe(() => {
            // Uppdatera task i lista
            const index = this.tasks.findIndex((t) => t.id === task.id);
            if (index !== -1) {
                this.tasks[index] = task;
            }
        });
    }

    toggleCompletion(task: any): void {
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        console.log('Before updateTask:', updatedTask); // Logga datan som skickas till backend
        this.taskService.updateTask(task.id, updatedTask).subscribe(
            (response) => {
                console.log('Backend response:', response);
                task.isCompleted = updatedTask.isCompleted; // Uppdatera lokalt efter lyckad backend-svar
            },
            (error) => {
                console.error('Backend error:', error); // Logga fel från backend
            }
        );
        
    }
    
}
