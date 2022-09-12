import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

import { TaskService } from 'src/app/services/task.service';

import { Task } from 'src/app/types/task';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  undoneTasks: Task[] = [];
  doneTasks: Task[] = [];

  tasksVisibility: 'all' | 'done' | 'undone' = 'all';

  public tasksSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList(): void {
    this.tasks$ = this.taskService.tasks$;

    this.tasksSubscription = this.tasks$.subscribe(values => {
      this.undoneTasks =  values.filter(task => !task.isDone);
      this.doneTasks =  values.filter(task => task.isDone);
    });
  }

  openDialog(task: Task | null = null): void {
      const shareDataObj = {
        data: {task}
      };
      const dialogRef = this.dialog.open(TaskDialogComponent, shareDataObj);

    dialogRef.afterClosed().subscribe(result => {
      this.getTasksList();
    })
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe()
  }

  changeTaskVisibility(visibility: 'all' | 'undone' | 'done') {
    this.tasksVisibility = visibility;
  }
}
