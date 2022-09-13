import { Component, OnChanges, Input, ElementRef, ViewChild, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-sort-menu',
  templateUrl: './sort-menu.component.html',
  styleUrls: ['./sort-menu.component.scss']
})
export class SortMenuComponent implements OnChanges {
  @Input() isMenuOpened!: boolean;
  @Output() closeMenuEvent: EventEmitter<void> = new EventEmitter()
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

  formData = new FormGroup({
    sort: new FormControl<'name' | 'deadline' | 'priority' | ''>(''),
    sorttype: new FormControl<'asc' | 'desc' | ''>('')
  });
  
  constructor(
    private taskService: TaskService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isMenuOpened'].currentValue) {
      this.openMenu();
    }

    this.onFormChanges()
  }

  onFormChanges() {
    this.formData.get('sort')?.valueChanges.subscribe(_ => this.formData.get('sorttype')?.setValue(''))
    this.formData.get('sorttype')?.valueChanges.subscribe(_ => this.sortTasks())
  }

  openMenu(): void {
    this.sortMenu.nativeElement.style.display = 'block';
  }

  closeMenu(): void {
    this.sortMenu.nativeElement.style.display = 'none';
    this.closeMenuEvent.emit();
  }

  sortTasks(): void {
    const sort = this.formData.controls.sort.value || 'name';
    const sortType = this.formData.controls.sorttype.value || 'asc';

    if (this.formData.controls.sort.value && this.formData.controls.sorttype.value) {
      this.taskService.sortTasks(sort, sortType);
      this.closeMenu();
    }

  }
}
