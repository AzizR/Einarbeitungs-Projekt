import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/types/task';

import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {  
  @Input() tasksList: Task[] = [];
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();

  constructor(private taskService: TaskService) {}

  updateTask(task: Task): void {
    this.onUpdateTask.emit(task);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasksList, event.previousIndex, event.currentIndex)
    this.taskService.savePositionedTasks(this.tasksList)
  }
}
