import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {  
  @Input() tasksList: Task[] = [];
  @Output() onTaskDelete: EventEmitter<string> = new EventEmitter();
  @Output() onUpdateTaskStatus: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  deleteTask(taskId: string): void {
    this.onTaskDelete.emit(taskId);
  }

  updateTaskStatus(task: Task): void {
    this.onUpdateTaskStatus.emit(task);
  }

  updateTask(task: Task): void {
    this.onUpdateTask.emit(task);
  }
}
