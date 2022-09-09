import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Task } from 'src/app/types/task';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from 'src/app/services/task.service';
import { Priority } from 'src/app/types/priority';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  task: Task | null = null;

  taskFormData = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>(''),
    description: new FormControl<string>(''),
    deadline: new FormControl<string>(''),
    priority: new FormControl<Priority>('Niedrig')
  });

  closeDialog = false;

  priorityOptions: Priority[] = ['Hoch', 'Mittel', 'Niedrig'];
 
  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.setFormValue();
  }

  setFormValue(): void {
    if(this.task) {
      // Object.keys(this.task).forEach(...)
      const date = this.task?.['deadline'].split('.')
      let deadline = date.length > 2 ? `${date[2]}-${date[1].length === 1 && '0'}${date[1]}-${date[0].length === 1 ? '0' : ''}${date[0]}` : null;
      
      this.taskFormData.controls['id'].setValue(this.task?.['id']);
      this.taskFormData.controls['name'].setValue(this.task?.['name']);
      this.taskFormData.controls['description'].setValue(this.task?.['description']);
      this.taskFormData.controls['deadline'].setValue(deadline);
      this.taskFormData.controls['priority'].setValue(this.task?.['priority']);
    }
  }

  saveTask(): void {
    const id = uuidv4();

    const task: Task =this.getTask(id)

    this.taskService.addTask(task);
    this.closeDialog = true;
  }

  updateTask() {
    console.log('updating');
    const id: string = this.task?.id || ''
    const task: Task = this.getTask(id)

    this.taskService.updateTask(task);
    this.closeDialog = true;
  }

  getTask(id: string) {
    return  {
      id,
      name: this.taskFormData.value.name || '',
      description: this.taskFormData.value.description || '',
      deadline: new Date(this.taskFormData.value.deadline || '').toLocaleDateString() || '',
      priority: this.taskFormData.value.priority || "Niedrig",
      isDone: false
    };
  }
}
