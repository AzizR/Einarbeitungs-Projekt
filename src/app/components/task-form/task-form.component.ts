import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Task } from 'src/app/types/task';

import { TaskService } from 'src/app/services/task.service';
import { v4 as uuidv4 } from 'uuid';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

type Priority ='Hoch' | 'Mittel' | 'Niedrig'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskFormData = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    deadline: new FormControl<string>(''),
    priority: new FormControl<string>('')
  })

  priorityOptions: Priority[] = ['Hoch', 'Mittel', 'Niedrig']
 
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  saveTask(): void {
    console.log(typeof this.taskFormData.value.name);
    const id = uuidv4();

    const task: Task = {
      ...this.taskFormData.value,
      id,
      name: '',
      description: '',
      deadline: '',
      priority: 'Hoch'
    }
    console.log(task)

    // this.taskService.addTask(task);
  }
}
