import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

// Services
import { TaskService } from 'src/app/services/task.service';

// Types
import { Task } from 'src/app/types/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasksList: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasksList();
  }

  getTasksList(): void {
    console.log(this.taskService.getTasksList());
    this.tasksList = this.taskService.getTasksList();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      this.getTasksList()
    })

  }

}
