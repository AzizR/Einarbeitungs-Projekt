import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() onTaskUpdate: EventEmitter<Task> = new EventEmitter();

  constructor(private taskService: TaskService) {}

  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  updateTaskStatus(task: Task): void{
    this.taskService.updateTaskStatus(task);
  }

  updateTask(task: Task): void {
    this.onTaskUpdate.emit(task);
  }
}
