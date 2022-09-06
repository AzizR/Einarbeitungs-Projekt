import { Injectable } from '@angular/core';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {
  constructor() { }

  getTasksList(): Task[] {
    const tasks: string | null = window.localStorage.getItem('tasks');

    if(!tasks) {
      return [];
    }
    const tasksList: Task[] = JSON.parse(tasks);
    return tasksList;
  }
}
