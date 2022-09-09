import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-controls',
  templateUrl: './task-controls.component.html',
  styleUrls: ['./task-controls.component.scss']
})
export class TaskControlsComponent {
  formData = new FormGroup({
    sort: new FormControl<'name' | 'deadline' | 'priority' | ''>(''),
    sorttype: new FormControl<'asc' | 'desc' | ''>('')
  })

  @ViewChild('sortmenu') sortMenu!: ElementRef;

  sortType = [
    {name: 'Ascending', value: 'asc'},
    {name: 'Descending', value: 'desc'}
  ]

  sortItems = [
    {name: 'Name', value: 'name'},
    {name: 'Fälligkeit', value: 'deadline'},
    {name: 'Priorität', value: 'priority'}
  ]

  constructor(
    private taskService: TaskService
  ) { }

  handleMenuOpen(): void {
    console.log(this.sortMenu.nativeElement);
    this.sortMenu.nativeElement.style.display = 'block';
  }

  closeMenu(): void {
    this.sortMenu.nativeElement.style.display = 'none';
  }

  sortTasks(): void {
    console.log('test');
    // this.closeMenu()
    const sort = this.formData.controls.sort.value || 'name';
    const sortType = this.formData.controls.sorttype.value || 'asc'
    this.taskService.sortTasks(sort, sortType)
  }

}
