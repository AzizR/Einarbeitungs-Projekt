import { Injectable } from '@angular/core';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }

  getTasksList(): Task[] {
    const tasks: string | null = window.localStorage.getItem('tasks');
    if(!tasks) {
      return [];
    }
    const tasksList: Task[] = JSON.parse(tasks);
    console.log(tasksList)

    return tasksList;
  }

  addTask(task: Task): void {
    let tasks = this.getTasksList();
    if(!Array.isArray(task)) tasks = []
    tasks.push(task);
    window.localStorage.setItem('tasks', JSON.stringify(task));
  }

  saveTasks(tasks: Task[]): void {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}