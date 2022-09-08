import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() onTaskDelete: EventEmitter<string> = new EventEmitter();
  @Output() onTaskUpdateStatus: EventEmitter<Task> = new EventEmitter();
  @Output() onTaskUpdate: EventEmitter<Task> = new EventEmitter();

  deleteTask(taskId: string): void {
    this.onTaskDelete.emit(taskId);
  }

  updateTaskStatus(task: Task): void{
    this.onTaskUpdateStatus.emit(task);
  }

  updateTask(task: Task): void {
    this.onTaskUpdate.emit(task);
  }
}
