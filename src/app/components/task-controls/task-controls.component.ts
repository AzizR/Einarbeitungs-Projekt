import { Component, Output, EventEmitter } from '@angular/core';

type VisisbilityType = 'all' | 'done' | 'undone';

@Component({
  selector: 'app-task-controls',
  templateUrl: './task-controls.component.html',
  styleUrls: ['./task-controls.component.scss']
})
export class TaskControlsComponent {
  isMenuOpened: boolean = false;
  tasksVisibility: VisisbilityType = 'all';
  @Output() changeTasksVisibility: EventEmitter<VisisbilityType> = new EventEmitter()

  openSortMenu(): void {
    this.isMenuOpened = true;
  }

  closeSortMenu(): void {
    this.isMenuOpened = false;
  }

  changeVisibility(): void {
    console.log('event', this.tasksVisibility);
    this.changeTasksVisibility.emit(this.tasksVisibility)
  }

}
