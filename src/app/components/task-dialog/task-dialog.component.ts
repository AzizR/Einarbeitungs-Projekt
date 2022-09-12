import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDirective } from 'src/app/directives/dynamic-components/dialog.directive';
import { Task } from 'src/app/types/task';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  title: string = 'Neue Aufgabe'

  constructor(@Inject(MAT_DIALOG_DATA) public data: {task: Task | null}) {}

  @ViewChild(DialogDirective, {static: true}) appDialog!: DialogDirective;

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const viewContaierRef = this.appDialog.viewContainerRef;

    const componentRef = viewContaierRef.createComponent(TaskFormComponent);
    componentRef.instance.task = this.data.task;
  }
}
