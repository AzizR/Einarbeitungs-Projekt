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
  tasksList: Task[] = [];
  undoneTasks: Task[] = [];
  doneTasks: Task[] = [];

  tasks$: Observable<Task[]> | undefined;
  public tasksSubscription: Subscription | undefined;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList(): void {
    this.tasks$ = this.taskService.tasks$

    this.tasksSubscription = this.tasks$.subscribe(values => {
      this.undoneTasks =  values.filter(task => !task.isDone)
      this.doneTasks =  values.filter(task => task.isDone)
    });
  }

  openDialog(task: Task | null = null): void {
      // TODO: provide the task to TaskDialogComponent
      const shareDataObj = {
        data: {task}
      };
      const dialogRef = this.dialog.open(TaskDialogComponent, shareDataObj);

    dialogRef.afterClosed().subscribe(result => {
      this.getTasksList();
    })
  }

  deleteTask(taskId: string): void {
    console.log(taskId);
    
    this.taskService.deleteTask(taskId);
    this.getTasksList();
  }

  updateTaskStatus(task: Task): void {
    this.taskService.updateTaskStatus(task);
    this.getTasksList();
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe()
  }
}
