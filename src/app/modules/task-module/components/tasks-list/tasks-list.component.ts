import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../types/task';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {  
  @Input() tasksList: Task[] = [];
  @Input() viewType!: 'list' | 'tile';
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
