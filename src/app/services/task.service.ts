import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { Task } from '../types/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _tasks = new BehaviorSubject<Task[]>([])
  readonly tasks$ = this._tasks.asObservable();

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this._tasks.next(this.getTasksList());
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
    this.loadTasks();
  }

  addTask(task: Task): void {
    let tasks = this.getTasksList();

    if(!Array.isArray(tasks)) {
      tasks = [];
    }
    tasks.push(task);

    this.saveTasks(tasks);
  }

  deleteTask(taskId: string): void {
    let tasks = this.getTasksList();
    
    if(Array.isArray(tasks)) {
      tasks = tasks.filter(tasksItem => tasksItem.id !== taskId);
    }

    this.saveTasks(tasks);
  }

  updateTaskStatus(task: Task): void {
    let tasks = this.getTasksList();
    let currentTask = tasks.find((taskItem: Task) => taskItem.id === task.id);
    
    if(currentTask) {
      this.deleteTask(task.id);
      currentTask.isDone = !currentTask.isDone;
      this.addTask(currentTask);
    }
    this.loadTasks();
  }

  updateTask(task: Task): void {
    let tasks = this.getTasksList();
    
    this.deleteTask(task.id);
    this.addTask(task);
  }

  savePositionedTasks(tasks: Task[]) {
    if(tasks.length > 0) {
      const isDoneTasks = tasks[0].isDone;
      let tasksWithOppositeStatus: Task[] = [];

      this._tasks.subscribe(lastTasks => {
        tasksWithOppositeStatus = lastTasks.filter(task => task.isDone !== isDoneTasks)
      });

      this.saveTasks([
        ...tasksWithOppositeStatus,
        ...tasks
      ])
      
    }
  }

  sortTasks(sortingAtribbute: 'name' | 'deadline' | 'priority', sortingType: 'asc' | 'desc'): Task[] {
    let sortedTasks: Task[] = []
    this._tasks.subscribe(tasks => {
      console.log(tasks);
      // Todo: change any types to Task, debug a type error
      if(sortingType === 'asc') {
        sortedTasks = tasks.sort((a, b) => a[sortingAtribbute].localeCompare(b[sortingAtribbute]))
      } else {
        sortedTasks = tasks.sort((a: any, b: any) =>  b[sortingAtribbute].localeCompare(a[sortingAtribbute]))
      }
      console.log('sorted', sortedTasks);
    })
    this.saveTasks(sortedTasks)

    return sortedTasks;
  }

}
