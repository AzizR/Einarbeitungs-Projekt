import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks = new BehaviorSubject<Task[]>([])
  readonly tasks$ = this._tasks.asObservable();

  constructor() {
    this.loadTasks()
  }

  loadTasks(): void {
    this._tasks.next(this.getTasksList())
  }

  getTasksList(): Task[] {
    const tasks: string | null = window.localStorage.getItem('tasks');
    if(!tasks) {
      return [];
    }

    return JSON.parse(tasks);
  }
  
  saveTasks(tasks: Task[]): void {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    let tasks = this.getTasksList();

    if(!Array.isArray(tasks)) {
      tasks = [];
    }
    tasks.push(task);

    this.saveTasks(tasks);
    this.loadTasks()
  }

  deleteTask(taskId: string): void {
    let tasks = this.getTasksList();
    
    if(Array.isArray(tasks)) {
      tasks = tasks.filter(tasksItem => tasksItem.id !== taskId);
    }

    this.saveTasks(tasks);
    this.loadTasks()
  }

  updateTaskStatus(task: Task): void {
    let tasks = this.getTasksList();
    let currentTask = tasks.find((taskItem: Task) => taskItem.id === task.id)
    
    if(currentTask) {
      this.deleteTask(task.id)
      currentTask.isDone = !currentTask.isDone
      this.addTask(currentTask)
    }
    this.loadTasks()
  }

  updateTask(task: Task): void {
    let tasks = this.getTasksList();
    
    this.deleteTask(task.id)
    this.addTask(task)
  }

}
