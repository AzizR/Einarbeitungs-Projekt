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

  // Todo: rename savePositionedTasks
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
    let sortedTasks: Task[] = [];
    this._tasks.subscribe(tasks => {
      switch(sortingAtribbute) {
        case 'deadline': 
          sortedTasks = this.sortByDate(tasks, sortingType);
          break;
        case 'priority':
          sortedTasks = this.sortByPriority(tasks, sortingType);
          break;
        default:
          sortedTasks = this.sortByName(tasks, sortingType);
      }
    })
    this.saveTasks(sortedTasks);
    return sortedTasks;
  }

  sortByName(tasks: Task[], type: 'asc' | 'desc'): Task[] {
    if(type === 'asc') {
      return tasks.sort((a, b) => a.name.localeCompare(b.name));
    }

    return tasks.sort((a, b) =>  b.name.localeCompare(a.name));
  }

  sortByDate(tasks: Task[], type: 'asc' | 'desc'): Task[] {
    // Refactor
    return tasks.sort((a, b) => {
      const ADateParts = a.deadline.split('.'); // a.deadline - DD.MM.YYYY
      const ADeadlineDate = new Date(`${ADateParts[2]}-${ADateParts[1]}-${ADateParts[0]}`);

      const BDateParts = b.deadline.split('.');
      const BDeadlineDate = new Date(`${BDateParts[2]}-${BDateParts[1]}-${BDateParts[0]}`);

      if(type === 'asc') {
        return ADeadlineDate.getTime() - BDeadlineDate.getTime();
      } else {
        return BDeadlineDate.getTime() - ADeadlineDate.getTime();
      }
    });      
  }

  sortByPriority(tasks: Task[], type: 'asc' | 'desc'): Task[] {
    const priorityHashTable = [
      { title: 'Hoch', value: 3 },
      { title: 'Mittel', value: 2 },
      { title: 'Niedrig', value: 1 }
    ];

    return tasks.sort((a, b) => {
      const prioFromHashA = priorityHashTable.find(prio => prio.title === a.priority);
      const prioFromHashB = priorityHashTable.find(prio => prio.title === b.priority);

      if(prioFromHashA && prioFromHashB) {
        if(type === 'asc') {
          return prioFromHashA.value - prioFromHashB.value;
        } else {
          return prioFromHashB.value - prioFromHashA.value;
        }
      }

      return 0
    });
  }
}
