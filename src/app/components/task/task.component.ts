import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TaskService } from 'src/app/services/task.service';

import { Task } from 'src/app/types/task';
import { Observable, Subscription } from 'rxjs';
import { DialogProperties } from 'src/app/types/dialog-properties';

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

  taskFormProps!: DialogProperties;
  viewType: 'list' | 'tile' = 'list'

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

  // TODO: refactor (DRY)
  openUpdateTaskDialog(task: Task): void {
    this.taskFormProps = {
      title: 'Aufgabe ändern',
      saveBtnText: 'Aktualiesieren',
      data: task
    };
  }

  // TODO: refactor (DRY)
  openCreateTaskDialog(): void {
    this.taskFormProps = {
      title: 'Neue Aufgabe',
      saveBtnText: 'Speichern'      
    };
  }

  ngOnDestroy(): void {
    this.tasksSubscription?.unsubscribe();
  }

  changeTaskVisibility(visibility: 'all' | 'undone' | 'done') {
    this.tasksVisibility = visibility;
  }

  changeViewType(viewType: 'list' | 'tile'): void {
    this.viewType = viewType;
  }
}
